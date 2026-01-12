import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export function RefundPolicy() {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            <Header />
            <main className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-bold text-dark-gray mb-12 text-center">Refund Policy</h1>

                <div className="prose prose-lg mx-auto space-y-8 text-gray-600">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-dark-gray">RETURNS</h2>
                        <div className="space-y-4">
                            <p>
                                Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.
                            </p>
                            <p>
                                To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
                            </p>
                            <p>
                                Several types of goods are exempt from being returned. Non-returnable items include downloadable software products, software licenses, printer accessories, and gift cards.
                            </p>
                            <p>
                                Subscription plans are subject to different return policies as outlined below. In case of any doubt please refer to the plan documentation. Support plans, memberships, and hardware coverage plans are subject to partial refunds on a pro-rated basis.
                            </p>
                            <p>
                                To complete your return, we require a receipt or proof of purchase.
                            </p>
                            <p className="font-semibold text-red-500">
                                Please do not send your purchase back to the manufacturer.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-dark-gray">Refunds (if applicable)</h2>
                        <div className="space-y-4">
                            <p>
                                Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. Refunds can be processed online at the discretion of a support professional or a supervisor.
                            </p>
                            <p>
                                If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within 5 to 7 working days.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-dark-gray">Late or missing refunds (if applicable)</h2>
                        <div className="space-y-4">
                            <p>
                                If you haven’t received a refund yet, first check your bank account again.
                                Then contact your credit card company, it may take some time before your refund is officially posted.
                                Next contact your bank. There is often some processing time before a refund is posted.
                            </p>
                            <p>
                                If you’ve done all of this and you still have not received your refund yet, please contact us at <a href="mailto:support@abinfosol.com" className="text-secondary hover:underline font-medium">support@abinfosol.com</a>.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-dark-gray">Sale items (if applicable)</h2>
                        <p>
                            Only regular priced items may be refunded, unfortunately sale items cannot be refunded.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-dark-gray">Exchanges (if applicable)</h2>
                        <p>
                            We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at <a href="mailto:support@abinfosol.com" className="text-secondary hover:underline font-medium">support@abinfosol.com</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-dark-gray">Gifts</h2>
                        <div className="space-y-4">
                            <p>
                                If the item was marked as a gift when purchased and shipped directly to you, you’ll receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you.
                            </p>
                            <p>
                                If the item wasn’t marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver and he will find out about your return.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-dark-gray">Shipping</h2>
                        <div className="space-y-4">
                            <p>
                                To return your product, you should mail your product to:
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-secondary font-medium text-dark-gray">
                                30 First Ave Moncton NB E1C 7X1
                            </div>
                            <p>
                                You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
                            </p>
                            <p>
                                Depending on where you live, the time it may take for your exchanged product to reach you, may vary.
                            </p>
                            <p>
                                If you are shipping an item over $75, you should consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-dark-gray">Accepted Payment Methods</h2>
                        <p>
                            We accept all major credit cards including Visa, MasterCard, American Express, and Discover.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}
