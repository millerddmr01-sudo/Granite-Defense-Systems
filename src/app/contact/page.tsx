import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background text-foreground py-16 px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Contact Us</h1>
                <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
                    Have a question about a custom build, gunsmithing service, training, or NFA item? Fill out the form below or reach out directly.
                </p>
            </div>

            <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-8">
                    <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-xl font-bold uppercase mb-4 text-primary">Granite Defense Systems</h3>
                        <div className="space-y-4 text-secondary">
                            <p className="flex items-start gap-3">
                                <svg className="w-6 h-6 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span>
                                    12172 S Aspen Brook Cir<br />
                                    Riverton, Utah 84065
                                </span>
                            </p>
                            <p className="flex items-center gap-3">
                                <svg className="w-6 h-6 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                <a href="tel:4802414522" className="hover:text-primary transition-colors">480-241-4522</a>
                            </p>
                            <p className="flex items-center gap-3">
                                <svg className="w-6 h-6 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                <a href="mailto:info@granitedefensesystems.com" className="hover:text-primary transition-colors">info@granitedefensesystems.com</a>
                            </p>
                        </div>
                    </div>

                    <div className="bg-zinc-900 text-white p-8 rounded-lg">
                        <h3 className="text-xl font-bold uppercase mb-4">Hours of Operation</h3>
                        <p className="text-zinc-400 mb-2">We operate primarily by appointment to ensure dedicated time for your build or consultation.</p>
                        <p className="font-bold text-primary text-lg">By Appointment Only</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
