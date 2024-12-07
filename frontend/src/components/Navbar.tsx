import Link from "next/link";


export default function Navbar() {
    return (
        <div className="flex flex-row items-center gap-10 px-10 border-b">
            <img src="/images/nus_fintech_logo.png" />
            <div className="flex flex-col">
                <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl">Credit Scoring Predictions with XAI</h1>
                <h2 className="scroll-m-20 text-xl tracking-tight text-gray-500">By Kieron, Chong Sun, Cleo, Alexander and Ashwin</h2>
            </div>
            <Link href="/predict" className="scroll-m-20 text-2xl font-semibold tracking-tight">Predict Credit Score</Link>
        </div>
    )
}