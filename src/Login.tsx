import { useState } from 'react'
import { EyeIcon, EyeSlashIcon, ExclamationTriangleIcon, LockClosedIcon, BuildingOffice2Icon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs))
}

export default function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    const [showPassword, setShowPassword] = useState(false)
    const [selectedOrg, setSelectedOrg] = useState({ name: 'Strata Manufacturing HQ', users: '245 users', active: true })

    const organizations = [
        { name: 'Strata Manufacturing HQ', users: '245 users', active: true },
        { name: 'Strata West Coast Division', users: '89 users', active: false },
        { name: 'Strata Europe Operations', users: '156 users', active: true },
    ]

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-100 p-4 font-sans text-zinc-900">
            <div className="w-full max-w-[480px] shadow-xl ring-1 ring-zinc-900/5 bg-white rounded-xl overflow-hidden">
                <div className="p-8 space-y-8">
                    {/* Header */}
                    <div className="space-y-6 text-center">
                        <div className="mx-auto w-32 h-16 bg-zinc-100 flex items-center justify-center text-zinc-400 text-xs tracking-widest uppercase font-semibold border border-zinc-200">
                            Client Logo
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-normal text-zinc-900">Sign In</h1>
                            <p className="text-zinc-500 text-sm">Access your workspace</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Alert */}
                        <div className="rounded-md bg-red-50 p-4 border border-red-100">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <ExclamationTriangleIcon className="h-5 w-5 text-red-900" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-900">Authentication Failed for selected Organization</h3>
                                    <div className="mt-1 text-xs text-red-700">
                                        <p>Please check your credentials and organization selection</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5">
                            {/* Organization Select */}
                            <Listbox value={selectedOrg} onChange={setSelectedOrg}>
                                <div className="relative mt-1">
                                    <Listbox.Label className="block text-sm font-medium leading-6 text-zinc-900 mb-2">Select Organization</Listbox.Label>
                                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-950 sm:text-sm sm:leading-6">
                                        <span className="block truncate">{selectedOrg.name}</span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon className="h-5 w-5 text-zinc-400" aria-hidden="true" />
                                        </span>
                                    </Listbox.Button>
                                    <Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {organizations.map((org, orgIdx) => (
                                                <Listbox.Option
                                                    key={orgIdx}
                                                    className={({ active }) =>
                                                        cn(
                                                            active ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-900',
                                                            'relative cursor-default select-none py-3 pl-3 pr-9'
                                                        )
                                                    }
                                                    value={org}
                                                >
                                                    {({ selected }) => (
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-zinc-100 p-1.5 rounded-md"><BuildingOffice2Icon className="h-4 w-4 text-zinc-500" /></div>
                                                            <div className="flex flex-col">
                                                                <span className={cn(selected ? 'font-semibold' : 'font-medium', 'block truncate')}>
                                                                    {org.name}
                                                                </span>
                                                                <span className="text-xs text-zinc-500">{org.users}</span>
                                                            </div>
                                                            <span className={cn("ml-auto h-2 w-2 rounded-full", org.active ? "bg-green-500" : "bg-zinc-300")} />
                                                        </div>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>

                            {/* Work Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-zinc-900 mb-2">Work Email</label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="block w-full rounded-md border-0 py-3 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-950 sm:text-sm sm:leading-6"
                                        defaultValue="maria.gonzalez@estrata.com"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-zinc-900 mb-2">Password</label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        id="password"
                                        className="block w-full rounded-md border-0 py-3 pr-10 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-950 sm:text-sm sm:leading-6"
                                        defaultValue="SecurePass2025!"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <button onClick={() => setShowPassword(!showPassword)} className="text-zinc-400 hover:text-zinc-600">
                                            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Requirements */}
                            <div className="bg-zinc-50 p-3 rounded-md border border-zinc-100 space-y-2">
                                <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                                    <ExclamationTriangleIcon className="h-3 w-3" /> Password must contain:
                                </div>
                                <ul className="text-[10px] text-zinc-500 space-y-1 pl-1">
                                    {['Minimum 8 characters', 'At least one uppercase letter', 'At least one number', 'At least one special character (!@#$%)'].map((req, i) => (
                                        <li key={i} className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-zinc-400" /> {req}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <button
                                type="button"
                                onClick={onLoginSuccess}
                                className="flex w-full justify-center rounded-md bg-zinc-900 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 items-center"
                            >
                                Log In <ArrowRightIcon className="ml-2 h-4 w-4" />
                            </button>
                            <div className="text-center">
                                <a href="#" className="text-sm font-medium text-zinc-500 hover:text-zinc-900">Forgot Password?</a>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="w-full pt-6 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400">
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-zinc-600">Need access?</a>
                            <a href="#" className="hover:text-zinc-600">Contact Admin</a>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <LockClosedIcon className="h-3 w-3 text-zinc-400" /> Secure Login
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
