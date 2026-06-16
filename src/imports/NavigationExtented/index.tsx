import svgPaths from "./svg-dc31i35z03";
type HomeProps = {
  className?: string;
  property1?: "Active" | "Default";
};

function Home({ className, property1 = "Active" }: HomeProps) {
  return (
    <div className={className || "overflow-clip relative size-[42px]"}>
      {property1 === "Active" && (
        <div className="absolute inset-[10.73%_14.29%_10.71%_14.29%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32.9955">
            <path d={svgPaths.p114d9600} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      )}
      {property1 === "Default" && (
        <div className="absolute inset-[10.73%_14.29%_10.71%_14.29%]" data-name="Vector (Stroke)">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32.9955">
            <path clipRule="evenodd" d={svgPaths.p21fe6800} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector (Stroke)" />
          </svg>
        </div>
      )}
    </div>
  );
}
type NavigationExtentedProps = {
  className?: string;
  property1?: "Default" | "Hover" | "Focus" | "Focused";
};

export default function NavigationExtented({ className, property1 = "Default" }: NavigationExtentedProps) {
  const isDefault = property1 === "Default";
  const isFocus = property1 === "Focus";
  const isFocused = property1 === "Focused";
  const isFocusOrFocused = ["Focus", "Focused"].includes(property1);
  const isHover = property1 === "Hover";
  return (
    <div className={className || "content-stretch flex items-start relative"}>
      {["Default", "Hover"].includes(property1) && (
        <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Menu-item">
          {isDefault && <Home className="overflow-clip relative shrink-0 size-[42px]" property1="Default" />}
          {isHover && (
            <>
              <div className="absolute bg-[rgba(38,49,84,0.1)] left-0 size-[80px] top-0" data-name="background" />
              <Home className="overflow-clip relative shrink-0 size-[42px]" />
            </>
          )}
        </div>
      )}
      <div aria-hidden={isFocusOrFocused ? true : undefined} className={isFocusOrFocused ? "absolute border border-solid border-white inset-0 pointer-events-none" : "bg-[#82479d] content-stretch flex gap-[10px] h-[80px] items-center pr-[10px] py-[10px] relative shrink-0 w-[254px]"}>
        {isDefault && (
          <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            Dashboard
          </p>
        )}
        {isHover && (
          <>
            <div className="absolute bg-[rgba(38,49,84,0.1)] h-[80px] left-0 top-0 w-[254px]" data-name="background" />
            <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Dashboard
            </p>
          </>
        )}
      </div>
      {isFocusOrFocused && (
        <>
          <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Menu-item">
            {isFocus && <Home className="overflow-clip relative shrink-0 size-[42px]" />}
            <div className={`absolute left-0 size-[80px] top-0 ${isFocused ? "bg-[rgba(38,49,84,0.2)]" : ""}`} data-name="background">
              {isFocus && <div aria-hidden className="absolute border-[rgba(255,255,255,0.4)] border-b-2 border-l-2 border-solid border-t-2 inset-0 pointer-events-none" />}
            </div>
            {isFocused && <Home className="overflow-clip relative shrink-0 size-[42px]" />}
          </div>
          <div className="bg-[#82479d] content-stretch flex gap-[10px] h-[80px] items-center pr-[10px] py-[10px] relative shrink-0 w-[254px]">
            {isFocus && (
              <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                Dashboard
              </p>
            )}
            <div className={`absolute h-[80px] left-0 top-0 w-[254px] ${isFocused ? "bg-[rgba(38,49,84,0.2)]" : ""}`} data-name="background">
              {isFocus && <div aria-hidden className="absolute border-[rgba(255,255,255,0.4)] border-b-2 border-r-2 border-solid border-t-2 inset-0 pointer-events-none" />}
            </div>
            {isFocused && (
              <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                Dashboard
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}