'use client';

import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to send message');
            }

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-50 dark:bg-zinc-900 p-8 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-bold uppercase mb-2">Full Name *</label>
                    <input
                        type="text"
                        id="name"
                        required
                        className="w-full bg-background border border-zinc-300 dark:border-zinc-700 rounded-sm p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-bold uppercase mb-2">Email Address *</label>
                    <input
                        type="email"
                        id="email"
                        required
                        className="w-full bg-background border border-zinc-300 dark:border-zinc-700 rounded-sm p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-bold uppercase mb-2">Phone Number (Optional)</label>
                <input
                    type="tel"
                    id="phone"
                    className="w-full bg-background border border-zinc-300 dark:border-zinc-700 rounded-sm p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-bold uppercase mb-2">Message *</label>
                <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full bg-background border border-zinc-300 dark:border-zinc-700 rounded-sm p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
            </div>

            <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`w-full py-4 font-bold uppercase tracking-wider rounded-sm transition-colors ${status === 'success'
                        ? 'bg-green-600 text-white cursor-default'
                        : 'bg-primary text-primary-foreground hover:opacity-90'
                    } disabled:opacity-50`}
            >
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
            </button>

            {status === 'success' && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-sm text-center">
                    Thank you! We have received your message and will get back to you shortly.
                </div>
            )}

            {status === 'error' && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-sm text-center">
                    Error: {errorMessage}. Please try again or email us directly at info@granitedefensesystems.com.
                </div>
            )}
        </form>
    );
}
