import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-xl font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-red-600 text-white focus:border-red-600 '
                    : 'border-transparent text-white hover:border-red-600') +
                className
            }
        >
            {children}
        </Link>
    );
}
