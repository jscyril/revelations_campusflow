export default function Footer() {
    return (
        <footer className="border-t border-[#1a1a1a] mt-12">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[#666] text-sm">
                    <span>⚡</span>
                    <span>CAMPUSHUB © 1986</span>
                </div>
                <div className="flex items-center gap-6 text-sm text-[#666]">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Help</a>
                </div>
            </div>
        </footer>
    );
}
