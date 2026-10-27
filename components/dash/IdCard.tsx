import Image from "next/image";

export function IdCard({ name, role, no, valid }: { name: string; role: string; no: string; valid: string }) {
  return (
    <div className="relative w-full max-w-[340px] aspect-[85.6/54] rounded-[20px] overflow-hidden bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 text-white p-5 shadow-lift">
      <div className="absolute -right-10 -top-14 size-40 rounded-full bg-mint-500/15" />
      <div className="relative flex items-center gap-2"><Image src="/psf-logo.png" alt="" width={28} height={28} className="rounded-full bg-white p-0.5" /><span className="font-serif text-[13px] font-semibold">Pakistan Strategic Forum</span></div>
      <div className="relative mt-4 flex items-end gap-3">
        <span className="size-14 rounded-xl bg-mint-100 text-brand-800 grid place-items-center font-bold text-lg shrink-0">{name.split(" ").filter((w) => w !== "Dr").map((w) => w[0]).join("").slice(0, 2)}</span>
        <div className="flex-1 min-w-0"><p className="font-semibold text-[16px] truncate">{name}</p><p className="text-[12px] text-mint-300">{role}</p><p className="mt-1 font-mono text-[11.5px] text-white/80">{no}</p><p className="text-[11px] text-white/60">Valid to {valid}</p></div>
        <svg viewBox="0 0 7 7" className="size-12 rounded-md bg-white p-1 shrink-0" aria-label="QR code" shapeRendering="crispEdges">{[0, 1, 2, 3, 4, 5, 6].flatMap((y) => [0, 1, 2, 3, 4, 5, 6].map((x) => ((x * 3 + y * 5 + x * y) % 3 === 0 || (x < 2 && y < 2) ? <rect key={`${x}${y}`} x={x} y={y} width="1" height="1" fill="#022c15" /> : null)))}</svg>
      </div>
    </div>
  );
}
