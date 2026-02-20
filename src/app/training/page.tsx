
import Link from "next/link";

export default function TrainingPage() {
    const courses = [
        {
            title: "Basic Pistol Course",
            subtitle: "Take the First Step",
            description: "The Basic Pistol Course focuses on basic firearm knowledge and safe firearm handling. We will teach you how to safely handle, load, fire and unload your firearm. We also teach the 7 Fundamentals of Marksmanship: 1. Stance, 2. Grip, 3. Sight Alignment, 4. Sight Picture, 5. Breath Control, 6. Trigger Control and 7. Follow Through.",
            notes: "We also provide a Dry Fire Practice Routine to help you stay consistent with what you have learned.",
            price: "$65",
            priceNote: "Contact us for Family Classes"
        },
        {
            title: "Customized Training",
            description: "We understand that every student has different needs and goals. That's why we offer customized training programs to meet your specific needs. Our certified instructor will work with you to develop a training plan that is tailored to your individual needs and goals.",
            price: "$85"
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground py-16 px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Tactical Training</h1>
                <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
                    Enhance your skills with our comprehensive training courses, from beginner safety to advanced tactical maneuvers.
                </p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                {courses.map((course, idx) => (
                    <div key={idx} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 flex flex-col hover:shadow-lg transition-shadow">
                        <div className="mb-6 flex-grow">
                            <h2 className="text-2xl font-black uppercase tracking-tight mb-2">{course.title}</h2>
                            {course.subtitle && (
                                <p className="text-primary font-bold uppercase tracking-wider text-sm mb-4">{course.subtitle}</p>
                            )}
                            <p className="text-secondary mb-4 leading-relaxed">
                                {course.description}
                            </p>
                            {course.notes && (
                                <p className="text-secondary italic text-sm border-l-4 border-zinc-300 dark:border-zinc-700 pl-4">
                                    {course.notes}
                                </p>
                            )}
                        </div>

                        <div className="mt-auto pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col items-center">
                            <div className="text-3xl font-black text-primary mb-2">
                                {course.price}
                            </div>
                            {course.priceNote && (
                                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide mb-4">
                                    {course.priceNote}
                                </p>
                            )}
                            <Link
                                href="/contact"
                                className="w-full py-3 bg-foreground text-background text-center font-bold uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity"
                            >
                                Register Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
