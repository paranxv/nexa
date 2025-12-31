from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from .. import models, schemas, database, utils
from datetime import timedelta
from jose import JWTError, jwt

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

@router.post("/signup", response_model=schemas.User)
def signup(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = utils.get_password_hash(user.password)
    new_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not utils.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=utils.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = utils.create_access_token(
        data={"sub": user.email, "id": user.id}, expires_delta=access_token_expires
    )
    refresh_token = utils.create_refresh_token(
        data={"sub": user.email, "id": user.id}
    )
    
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}

@router.post("/refresh", response_model=schemas.Token)
def refresh_token(refresh_token: str, db: Session = Depends(database.get_db)):
    try:
        payload = jwt.decode(refresh_token, utils.SECRET_KEY, algorithms=[utils.ALGORITHM])
        email: str = payload.get("sub")
        user_id: int = payload.get("id")
        if email is None or user_id is None:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
        
        # Verify user still exists
        user = db.query(models.User).filter(models.User.id == user_id).first()
        if user is None:
             raise HTTPException(status_code=401, detail="User not found")

        access_token_expires = timedelta(minutes=utils.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = utils.create_access_token(
            data={"sub": email, "id": user_id}, expires_delta=access_token_expires
        )
        # Rotate refresh token (optional, but good practice) - checking if needed, user didn't explicitly ask for rotation but "refresh token apis"
        # For simplicity return same refresh token or new one. Let's return new one to be safe.
        new_refresh_token = utils.create_refresh_token(
            data={"sub": email, "id": user_id}
        )
        
        return {"access_token": access_token, "refresh_token": new_refresh_token, "token_type": "bearer"}

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
