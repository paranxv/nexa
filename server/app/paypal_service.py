import os
from paypalcheckoutsdk.core import PayPalHttpClient, SandboxEnvironment
from paypalcheckoutsdk.orders import OrdersCreateRequest, OrdersCaptureRequest
from dotenv import load_dotenv

load_dotenv()

client_id = os.getenv("PAYPAL_CLIENT_ID", "mock_client_id")
client_secret = os.getenv("PAYPAL_CLIENT_SECRET", "mock_client_secret")

environment = SandboxEnvironment(client_id=client_id, client_secret=client_secret)
client = PayPalHttpClient(environment)

class PayPalService:
    @staticmethod
    def create_order(amount: float, return_url: str, cancel_url: str):
        request = OrdersCreateRequest()
        request.prefer('return=representation')
        request.request_body({
            "intent": "CAPTURE",
            "purchase_units": [{
                "amount": {
                    "currency_code": "USD",
                    "value": str(amount)
                }
            }],
            "application_context": {
                "return_url": return_url,
                "cancel_url": cancel_url
            }
        })
        
        try:
            response = client.execute(request)
            return response.result
        except IOError as ioe:
            print(ioe)
            if hasattr(ioe, 'status_code'):
                print(ioe.status_code)
            if hasattr(ioe, 'details'):
                print(ioe.details)
            return None

    @staticmethod
    def capture_order(order_id: str):
        request = OrdersCaptureRequest(order_id)
        try:
            response = client.execute(request)
            return response.result
        except IOError as ioe:
            # Handle errors
            return None
