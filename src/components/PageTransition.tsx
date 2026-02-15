"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        // Start fading out the white flash immediately after mount
        setIsFirstRender(false);
    }, []);

    return (
        <>
            {/* Initial Load Flash - White screen that fades out instantly */}
            <AnimatePresence>
                {isFirstRender && (
                    <motion.div
                        key="initial-flash"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed inset-0 z-[10000] bg-white pointer-events-none"
                    />
                )}
            </AnimatePresence>

            {/* Main Page Fade In */}
            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.21, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        </>
    );
}
