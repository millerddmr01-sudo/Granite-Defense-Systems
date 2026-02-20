export default function FAQPage() {
    const faqs = [
        {
            question: "How do I purchase a suppressor?",
            answer: "Purchasing a suppressor requires buying the item, purchasing a tax stamp ($200), and submitting fingerprints and photos to the ATF. We can guide you through the entire process, including the Form 4 submission."
        },
        {
            question: "What is your return policy?",
            answer: "We accept returns on unused, non-firearm products within 30 days of purchase. Firearms, ammunition, and custom work are final sale. Please contact us if you have issues with a specific product."
        },
        {
            question: "Can I order online and pick up in store?",
            answer: "Absolutely. Select 'Local Pickup' at checkout to avoid shipping fees. We will notify you when your order is ready for pickup at our Riverton, UT location."
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Frequently Asked Questions</h1>
                    <p className="text-lg text-secondary">
                        Common questions about our services, products, and policies.
                    </p>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                            <h3 className="text-lg font-bold uppercase mb-3 text-primary">{faq.question}</h3>
                            <p className="text-secondary leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center pt-16 border-t border-zinc-200 dark:border-zinc-800">
                    <p className="text-secondary mb-4">Still have questions?</p>
                    <a href="/contact" className="inline-block border-b-2 border-primary font-bold uppercase hover:text-primary transition-colors">
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
}
