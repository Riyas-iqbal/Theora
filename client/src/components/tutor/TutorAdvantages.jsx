import { PresentationChartBarIcon, ChartBarIcon, QuestionMarkCircleIcon, FolderPlusIcon } from '@heroicons/react/24/outline'
import SectionTitle from './SectionTitle'
import HorizontalRule from '../common/HorizontalRule'

const features = [
    {
        name: 'Easy Course Creation',
        description:
            'Our intuitive course creation tools allow you to create and upload courses quickly and easily.',
        icon: FolderPlusIcon,
    },
    {
        name: 'Global Reach',
        description:
            'With Theora, you can connect with learners from around the world and make a positive impact on their lives',
        icon: ChartBarIcon,
    },
    {
        name: 'Robust Analytics',
        description:
            "Track your course's performance with our detailed analytics dashboard, and use this data to optimize your teaching.",
        icon: PresentationChartBarIcon,
    },
    {
        name: 'Dedicated Support',
        description:
            'Our dedicated support team is here to help you every step of the way, from creating your course to answering learner questions.',
        icon: QuestionMarkCircleIcon,
    },
]

export default function TutorAdvantages() {
    return (
        <>
            <SectionTitle title='Why theora?' description='Empower Your Teaching With Theora.' />
            <HorizontalRule />
            <div className="bg-white py-6 sm:py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-xs sm:text-base font-semibold leading-7 text-center text-amber-600">Create and Share Your Expertise with Theora</h2>
                        <p className="mt-2 text-md font-bold tracking-tight text-center  text-gray-900 sm:text-4xl">
                            Join our global community of tutors and make a difference in learners' lives
                        </p>
                        <p className="mt-2 sm:mt-6 text-xs sm:text-lg leading-4 sm:leading-8 text-gray-600 text-center">
                            Unleash your teaching potential with our dynamic learning platform and reach students worldwide
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {features.map((feature) => (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600">
                                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </>
    )
}