import svgPaths from "./svg-p1t2lt1k6m";
type AlertsToastsProps = {
  className?: string;
  indication?: "Success" | "Error" | "Warning" | "Info";
  multiline?: boolean;
  type?: "Floating" | "In-Page";
};

export default function AlertsToasts({ className, indication = "Success", multiline = false, type = "Floating" }: AlertsToastsProps) {
  const isError = indication === "Error";
  const isInfo = indication === "Info";
  const isWarning = indication === "Warning";
  return (
    <div className={className || `content-stretch flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative w-[445px] ${indication === "Info" && type === "In-Page" ? "bg-[#f0fbff]" : indication === "Info" && type === "Floating" ? "bg-[#f0fbff] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)]" : indication === "Warning" && type === "In-Page" ? "bg-[#fff2e3]" : indication === "Warning" && type === "Floating" ? "bg-[#fff2e3] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)]" : indication === "Error" && type === "In-Page" ? "bg-[#ffecec]" : indication === "Error" && type === "Floating" ? "bg-[#ffecec] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)]" : indication === "Success" && type === "In-Page" ? "bg-[#e9fff3]" : "bg-[#e9fff3] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)]"}`}>
      <div aria-hidden className={`absolute border border-solid inset-0 pointer-events-none ${isInfo ? "border-[#0a7593]" : isWarning ? "border-[#a05600]" : isError ? "border-[#c00]" : "border-[#007e33]"}`} />
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
        {["Success", "Error", "Warning"].includes(indication) && (
          <div className={`relative shrink-0 ${isWarning ? "h-[14px] w-[16px]" : "size-[16px]"}`} data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox={isWarning ? "0 0 16 14" : "0 0 16 16"}>
              <path d={isWarning ? svgPaths.p1180e700 : isError ? svgPaths.pa4eed00 : svgPaths.p19807400} fill={isWarning ? "var(--fill-0, #A05600)" : isError ? "var(--fill-0, #CC0000)" : "var(--fill-0, #007E33)"} id="Vector" />
            </svg>
          </div>
        )}
        {isInfo && (
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
      {!multiline && (
        <p className={`[word-break:break-word] font-["Open_Sans:Regular",sans-serif] font-normal leading-[normal] relative self-stretch shrink-0 text-[14px] w-[324px] ${indication === "Info" && !multiline ? "text-[#0a7593]" : indication === "Warning" && !multiline ? "text-[#a05600]" : indication === "Error" && !multiline ? "text-[#c00]" : "text-[#007e33]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          Registration Setup has been changed successfully
        </p>
      )}
      {multiline && (
        <div className={`[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px relative self-stretch text-[14px] ${indication === "Info" && multiline ? "text-[#0a7593]" : indication === "Warning" && multiline ? "text-[#a05600]" : indication === "Error" && multiline ? "text-[#c00]" : "text-[#007e33]"}`}>
          <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 w-[337px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            A Request Completed Successfully.
          </p>
          <p className="font-['Open_Sans:Regular',sans-serif] font-normal min-w-full relative shrink-0 w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Registration Setup has been changed successfully
          </p>
        </div>
      )}
      {type === "Floating" && (
        <div className="absolute content-stretch flex items-center justify-center px-[4px] py-[3px] right-[14px] size-[20px] top-[8px]" data-name="icon 20x20">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="col-1 flex h-[13.8px] items-center justify-center ml-0 mt-0 relative row-1 w-[14px]">
              <div className="flex-none rotate-[44.48deg] skew-x-[-0.35deg]">
                <div className="bg-[#999] h-[3.04px] relative w-[16.618px]" />
              </div>
            </div>
            <div className="col-1 flex h-[13.915px] items-center justify-center ml-[0.06px] mt-[0.09px] relative row-1 w-[13.885px]">
              <div className="flex-none rotate-[134.83deg] skew-x-[0.35deg]">
                <div className="bg-[#999] h-[3.04px] relative w-[16.617px]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}