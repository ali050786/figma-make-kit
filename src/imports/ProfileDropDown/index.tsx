type ProfileDropDownProps = {
  className?: string;
  property1?: "Default" | "Focused" | "Hover";
};

export default function ProfileDropDown({ className, property1 = "Default" }: ProfileDropDownProps) {
  return (
    <div className={className || "bg-white content-stretch drop-shadow-[0px_0px_4px_rgba(0,0,0,0.25)] flex flex-col items-start justify-center relative rounded-[4px]"}>
      <div className="content-stretch flex gap-[10px] items-center p-[16px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0">
        <div aria-hidden className="absolute border-[#e7e7e7] border-b border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
        <div className="bg-[#df126c] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[40px]">
          <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-right text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            SJ
          </p>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 text-[#565962] whitespace-nowrap">
          <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Dr. Stevenson, Jennifer
          </p>
          <p className="font-['Open_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[12px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Providers
          </p>
        </div>
      </div>
      <div className={`content-stretch flex items-start px-[16px] py-[10px] relative shrink-0 w-[237px] ${property1 === "Hover" ? "bg-[rgba(38,49,84,0.1)]" : ""}`}>
        <div aria-hidden className={`absolute border-solid inset-0 pointer-events-none ${property1 === "Focused" ? "border-2 border-[rgba(10,117,147,0.3)]" : "border-[#e7e7e7] border-b"}`} />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0a7593] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          My Profile
        </p>
      </div>
      <div className="content-stretch flex items-start px-[16px] py-[10px] relative shrink-0 w-[237px]">
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0a7593] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Logout
        </p>
      </div>
    </div>
  );
}