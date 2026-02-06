const BackgroundVideo = () => {
    return (
        <>
            {/* Background Video */}
            <div className="fixed inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-50"
                >
                    <source
                        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260201_052917_7fc4e418-3123-40bf-b5ba-394c28eb4b3a.mp4"
                        type="video/mp4"
                    />
                </video>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#050505]" />
            </div>
        </>
    )
}

export default BackgroundVideo
