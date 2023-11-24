import { BellIcon, CubeTransparentIcon } from "@heroicons/react/24/solid"

export const Header = () => {
    return (
        <header className="container sticky top-0 border-b py-3">
            <div className="flex items-center justify-between">
                <CubeTransparentIcon className="h-8 w-8" />
                <div className="flex items-center space-x-6">
                    <BellIcon className="h-5 w-5 text-muted-foreground" />
                    <div className="h-8 w-8 rounded-full bg-muted-foreground"></div>
                </div>
            </div>
        </header>
    )
}
