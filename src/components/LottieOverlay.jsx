import { useState } from "react";
import Lottie from "lottie-react";

function LottieOverlay({ animationData, onComplete, size }) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 z-50 flex items-center justify-center">
            <Lottie
                animationData={animationData}
                loop={false}
                autoplay
                style={{ width: size, height: size }}
                onComplete={() => {
                    setIsVisible(false);
                    onComplete?.();
                }}
            />
        </div>
    );
}

export default LottieOverlay;
