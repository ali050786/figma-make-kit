import svgPaths from "./svg-mu4a9k8nju";
type BadgeProps = {
  className?: string;
  emphasisColors?: "Bold" | "Subtle" | "Minimal";
  indication?: "Green/Success" | "Blue/Information" | "Orange/Warning" | "Red/Error";
  withIcon?: boolean;
};

export default function Badge({ className, emphasisColors = "Bold", indication = "Green/Success", withIcon = false }: BadgeProps) {
  const isBlueInformationAndWithIcon = indication === "Blue/Information" && withIcon;
  const isGreenSuccessAndNotWithIconAndIsSubtleOrMinimal = indication === "Green/Success" && !withIcon && ["Subtle", "Minimal"].includes(emphasisColors);
  const isOrangeWarningAndWithIcon = indication === "Orange/Warning" && withIcon;
  const isRedErrorAndWithIcon = indication === "Red/Error" && withIcon;
  const isWithIcon = withIcon;
  return (
    <div className={className || `content-stretch flex items-center justify-center relative ${emphasisColors === "Minimal" && withIcon ? "gap-[4px] px-[6px] py-[2px] rounded-[12px]" : emphasisColors === "Minimal" && !withIcon ? "px-[6px] py-[2px] rounded-[12px]" : indication === "Blue/Information" && emphasisColors === "Subtle" && withIcon ? "bg-[#f0fbff] gap-[4px] px-[8px] py-[4px] rounded-[12px]" : indication === "Blue/Information" && emphasisColors === "Subtle" && !withIcon ? "bg-[#f0fbff] px-[12px] py-[4px] rounded-[12px]" : indication === "Orange/Warning" && emphasisColors === "Subtle" && withIcon ? "bg-[#fff2e3] gap-[4px] px-[8px] py-[4px] rounded-[12px]" : indication === "Orange/Warning" && emphasisColors === "Subtle" && !withIcon ? "bg-[#fff2e3] px-[12px] py-[4px] rounded-[12px]" : indication === "Red/Error" && emphasisColors === "Subtle" && withIcon ? "bg-[#ffecec] gap-[4px] px-[8px] py-[4px] rounded-[12px]" : indication === "Red/Error" && emphasisColors === "Subtle" && !withIcon ? "bg-[#ffecec] px-[12px] py-[4px] rounded-[12px]" : indication === "Green/Success" && emphasisColors === "Subtle" && withIcon ? "bg-[#e9fff3] gap-[4px] px-[8px] py-[4px] rounded-[12px]" : indication === "Green/Success" && emphasisColors === "Subtle" && !withIcon ? "bg-[#e9fff3] px-[12px] py-[4px] rounded-[12px]" : indication === "Blue/Information" && emphasisColors === "Bold" && withIcon ? "bg-[#f0fbff] gap-[8px] px-[12px] py-[4px] rounded-[20px]" : indication === "Blue/Information" && emphasisColors === "Bold" && !withIcon ? "bg-[#f0fbff] px-[12px] py-[4px] rounded-[20px]" : indication === "Orange/Warning" && emphasisColors === "Bold" && withIcon ? "bg-[#fff2e3] gap-[8px] pb-[5px] pt-[4px] px-[12px] rounded-[20px]" : indication === "Orange/Warning" && emphasisColors === "Bold" && !withIcon ? "bg-[#fff2e3] pb-[5px] pt-[4px] px-[12px] rounded-[20px]" : indication === "Red/Error" && emphasisColors === "Bold" && withIcon ? "bg-[#ffecec] gap-[8px] pb-[5px] pt-[4px] px-[12px] rounded-[20px]" : indication === "Red/Error" && emphasisColors === "Bold" && !withIcon ? "bg-[#ffecec] pb-[5px] pt-[4px] px-[12px] rounded-[20px]" : indication === "Green/Success" && emphasisColors === "Bold" && withIcon ? "bg-[#e9fff3] gap-[8px] pb-[5px] pt-[4px] px-[12px] rounded-[20px]" : "bg-[#e9fff3] pb-[5px] pt-[4px] px-[12px] rounded-[20px]"}`}>
      {["Bold", "Minimal"].includes(emphasisColors) && <div aria-hidden className={`absolute border border-solid inset-0 pointer-events-none ${emphasisColors === "Minimal" ? "border-[#e7e7e7] rounded-[12px]" : indication === "Blue/Information" && emphasisColors === "Bold" ? "border-[#0a7593] rounded-[20px]" : indication === "Orange/Warning" && emphasisColors === "Bold" ? "border-[#a05600] rounded-[20px]" : indication === "Red/Error" && emphasisColors === "Bold" ? "border-[#c00] rounded-[20px]" : "border-[#007e33] rounded-[20px]"}`} />}
      {!withIcon && (
        <p className={`[word-break:break-word] leading-[normal] relative shrink-0 whitespace-nowrap ${indication === "Blue/Information" && !withIcon && ["Subtle", "Minimal"].includes(emphasisColors) ? 'font-["Open_Sans:SemiBold",sans-serif] font-semibold text-[#0a7593] text-[12px] uppercase' : indication === "Orange/Warning" && !withIcon && ["Subtle", "Minimal"].includes(emphasisColors) ? 'font-["Open_Sans:SemiBold",sans-serif] font-semibold text-[#a05600] text-[12px] uppercase' : indication === "Red/Error" && !withIcon && ["Subtle", "Minimal"].includes(emphasisColors) ? 'font-["Open_Sans:SemiBold",sans-serif] font-semibold text-[#c00] text-[12px] uppercase' : isGreenSuccessAndNotWithIconAndIsSubtleOrMinimal ? 'font-["Open_Sans:SemiBold",sans-serif] font-semibold text-[#007e33] text-[12px] uppercase' : 'font-["Open_Sans:Regular",sans-serif] font-normal text-[#263154] text-[14px]'}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          {indication === "Blue/Information" && !withIcon ? "Blue Indication" : indication === "Orange/Warning" && !withIcon ? "Orange Indication" : indication === "Red/Error" && !withIcon ? "Red Indication" : isGreenSuccessAndNotWithIconAndIsSubtleOrMinimal ? "Green Indication" : "Green Indication"}
        </p>
      )}
      {isWithIcon && (
        <>
          <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
            {withIcon && ["Green/Success", "Red/Error", "Orange/Warning"].includes(indication) && (
              <div className={`relative shrink-0 ${isOrangeWarningAndWithIcon ? "h-[14px] w-[16px]" : "size-[16px]"}`} data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox={isOrangeWarningAndWithIcon ? "0 0 16 14" : "0 0 16 16"}>
                  <path d={isOrangeWarningAndWithIcon ? svgPaths.p1180e700 : isRedErrorAndWithIcon ? svgPaths.p2ce08100 : svgPaths.p19807400} fill={isOrangeWarningAndWithIcon ? "var(--fill-0, #A05600)" : isRedErrorAndWithIcon ? "var(--fill-0, #CC0000)" : "var(--fill-0, #007E33)"} id="Vector" />
                </svg>
              </div>
            )}
            {isBlueInformationAndWithIcon && (
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none rotate-180">
                  <div className="relative size-[16px]" data-name="Vector">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <path d={svgPaths.p147c2c00} fill="var(--fill-0, #0A7593)" id="Vector" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
          <p className={`[word-break:break-word] leading-[normal] relative shrink-0 whitespace-nowrap ${indication === "Blue/Information" && withIcon && ["Subtle", "Minimal"].includes(emphasisColors) ? 'font-["Open_Sans:SemiBold",sans-serif] font-semibold text-[#0a7593] text-[12px] uppercase' : indication === "Orange/Warning" && withIcon && ["Subtle", "Minimal"].includes(emphasisColors) ? 'font-["Open_Sans:SemiBold",sans-serif] font-semibold text-[#a05600] text-[12px] uppercase' : indication === "Red/Error" && withIcon && ["Subtle", "Minimal"].includes(emphasisColors) ? 'font-["Open_Sans:SemiBold",sans-serif] font-semibold text-[#c00] text-[12px] uppercase' : indication === "Green/Success" && withIcon && ["Subtle", "Minimal"].includes(emphasisColors) ? 'font-["Open_Sans:SemiBold",sans-serif] font-semibold text-[#007e33] text-[12px] uppercase' : 'font-["Open_Sans:Regular",sans-serif] font-normal text-[#263154] text-[14px]'}`} style={{ fontVariationSettings: '"wdth" 100' }}>
            {isBlueInformationAndWithIcon ? "Blue Indication" : isOrangeWarningAndWithIcon ? "Orange Indication" : isRedErrorAndWithIcon ? "Red Indication" : indication === "Green/Success" && withIcon ? "Green Indication" : ""}
          </p>
        </>
      )}
    </div>
  );
}