import svgPaths from "./svg-j4um6sxyr7";
type IdCardProps = {
  className?: string;
  property1?: "Active" | "Default";
};

function IdCard({ className, property1 = "Active" }: IdCardProps) {
  const isActive = property1 === "Active";
  const isDefault = property1 === "Default";
  return (
    <div className={className || "relative size-[42px]"}>
      {isActive && (
        <>
          <div className="absolute inset-[18.75%_6.25%]" data-name="Subtract">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.75 26.25">
              <path d={svgPaths.p242e2300} fill="var(--fill-0, white)" id="Subtract" />
            </svg>
          </div>
          <div className="absolute bottom-1/2 left-[28.13%] right-[59.38%] top-[37.5%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.25 5.25">
              <path d={svgPaths.p18ca5100} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </>
      )}
      {isDefault && (
        <>
          <div className="absolute inset-[18.75%_6.25%]" data-name="Vector (Stroke)">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.75 26.25">
              <path clipRule="evenodd" d={svgPaths.p2f1e0bc0} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector (Stroke)" />
            </svg>
          </div>
          <div className="absolute inset-[31.25%_18.75%_34.38%_18.75%]" data-name="Subtract">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.25 14.4375">
              <path d={svgPaths.peb9ddf2} fill="var(--fill-0, white)" id="Subtract" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}
type ResponsiveNavigationProps = {
  className?: string;
  property1?: "Default" | "hover" | "Variant3" | "Active";
};

export default function ResponsiveNavigation({ className, property1 = "Default" }: ResponsiveNavigationProps) {
  const isVariant3 = property1 === "Variant3";
  return (
    <div className={className || "bg-[#82479d] content-stretch flex gap-[8px] items-center max-w-[375px] px-[16px] py-[4px] relative w-[375px]"}>
      {["hover", "Active", "Variant3"].includes(property1) && <div aria-hidden={isVariant3 ? true : undefined} className={`absolute ${isVariant3 ? "border-2 border-solid border-white inset-0 pointer-events-none" : property1 === "Active" ? "bg-[rgba(38,49,84,0.2)] h-[50px] left-0 top-0 w-[375px]" : "bg-[rgba(38,49,84,0.1)] h-[50px] left-0 top-0 w-[375px]"}`} />}
      <IdCard className="relative shrink-0 size-[42px]" property1={property1 === "Default" ? "Default" : undefined} />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[16px] text-white" style={{ fontVariationSettings: '"wdth" 100' }}>
        ID Cards
      </p>
    </div>
  );
}