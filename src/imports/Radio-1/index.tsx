type RadioProps = {
  className?: string;
  state?: "Default" | "Focused" | "Disabled" | "Hovered" | "Error";
  status?: boolean;
};

export default function Radio({ className, state = "Default", status = false }: RadioProps) {
  const isDisabledAndNotStatus = state === "Disabled" && !status;
  const isDisabledAndStatus = state === "Disabled" && status;
  const isError = state === "Error";
  const isErrorAndStatus = state === "Error" && status;
  const isHoveredAndStatus = state === "Hovered" && status;
  return (
    <div className={className || "content-stretch flex gap-[8px] items-start relative"}>
      <div className="relative shrink-0 size-[20px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id={isError ? "Group 480" : "Group 479"}>
            {((state === "Hovered" && !status) || isError || (state === "Default" && status) || isDisabledAndStatus || (state === "Focused" && status)) && <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 40" r="9.5" stroke={isDisabledAndStatus ? "var(--stroke-0, #999999)" : isError ? "var(--stroke-0, #CC0000)" : "var(--stroke-0, #0A7593)"} />}
            {((state === "Default" && !status) || isDisabledAndNotStatus || (state === "Focused" && !status) || isHoveredAndStatus) && (
              <g id="Ellipse 40">
                <circle cx="10" cy="10" fill={isDisabledAndNotStatus ? "var(--fill-0, #E7E7E7)" : "var(--fill-0, white)"} r={isHoveredAndStatus ? "10" : "9.5"} />
                <circle cx="10" cy="10" r="9.5" stroke={isHoveredAndStatus ? "var(--stroke-0, #0A7593)" : "var(--stroke-0, #6B6F7A)"} strokeOpacity={isHoveredAndStatus ? "0.8" : undefined} />
                {!status && ["Default", "Disabled", "Focused"].includes(state) && <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-1, black)" strokeOpacity="0.2" />}
              </g>
            )}
            {status && ["Default", "Disabled", "Focused", "Error"].includes(state) && <circle cx="10" cy="10" fill={isErrorAndStatus ? "var(--fill-0, #CC0000)" : isDisabledAndStatus ? "var(--fill-0, #999999)" : "var(--fill-0, #0A7593)"} id="Ellipse 41" r="4.5" stroke={isErrorAndStatus ? "var(--stroke-0, #CC0000)" : isDisabledAndStatus ? "var(--stroke-0, #999999)" : "var(--stroke-0, #0A7593)"} />}
            {isHoveredAndStatus && (
              <g id="Ellipse 41">
                <circle cx="10" cy="10" fill="var(--fill-0, #0A7593)" fillOpacity="0.8" r="5" />
                <circle cx="10" cy="10" r="4.5" stroke="var(--stroke-0, #0A7593)" strokeOpacity="0.8" />
              </g>
            )}
          </g>
        </svg>
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Label
      </p>
      {state === "Focused" && (
        <div className="absolute left-[-2px] size-[24px] top-[-2px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" id="Ellipse 40" r="11.5" stroke="var(--stroke-0, #0A7593)" strokeOpacity="0.4" />
          </svg>
        </div>
      )}
    </div>
  );
}