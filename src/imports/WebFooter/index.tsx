import svgPaths from "./svg-06har4wwnf";
import imgImage3 from "./fd28a89c95b1b13661178375300912781fa4df5d.png";
import { imgGroup } from "./svg-oapmo";
type WebFooterProps = {
  className?: string;
  property1?: "Placeholder Two" | "Placeholder Four" | "Placeholder Three" | "Placeholder One" | "Unsecured";
};

export default function WebFooter({ className, property1 = "Placeholder One" }: WebFooterProps) {
  const isPlaceholderFour = property1 === "Placeholder Four";
  const isPlaceholderOne = property1 === "Placeholder One";
  const isPlaceholderOneOrUnsecured = ["Placeholder One", "Unsecured"].includes(property1);
  const isPlaceholderThree = property1 === "Placeholder Three";
  const isPlaceholderThreeOrUnsecured = ["Placeholder Three", "Unsecured"].includes(property1);
  const isPlaceholderTwo = property1 === "Placeholder Two";
  const isPlaceholderTwoOrPlaceholderOneOrPlaceholderThree = ["Placeholder Two", "Placeholder One", "Placeholder Three"].includes(property1);
  const isPlaceholderTwoOrPlaceholderOneOrPlaceholderThreeOrUnsecured = ["Placeholder Two", "Placeholder One", "Placeholder Three", "Unsecured"].includes(property1);
  const isPlaceholderTwoOrPlaceholderThree = ["Placeholder Two", "Placeholder Three"].includes(property1);
  const isPlaceholderTwoOrPlaceholderThreeOrUnsecured = ["Placeholder Two", "Placeholder Three", "Unsecured"].includes(property1);
  const isUnsecured = property1 === "Unsecured";
  return (
    <div className={className || `relative w-[1440px] ${isUnsecured ? "h-[266px]" : "h-[265px]"}`}>
      <div className="absolute bg-[#fff2f8] inset-0" data-name="Rectangle Copy" />
      {isPlaceholderTwoOrPlaceholderOneOrPlaceholderThreeOrUnsecured && (
        <>
          <div className={`absolute h-[30px] w-[100px] ${isUnsecured ? "bottom-[11px] left-[1129px]" : "bottom-[10px] left-[1162px]"}`} data-name="image 3">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
          </div>
          <p className={`[word-break:break-word] absolute font-["Open_Sans:Regular",sans-serif] font-normal leading-[16px] text-[12px] translate-y-full whitespace-nowrap ${isUnsecured ? "bottom-[34px] left-[1048px] text-[#999]" : "bottom-[33px] left-[1081px] text-[#565962]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
            Powered by
          </p>
          <div className={`absolute ${isUnsecured ? "-translate-y-1/2 contents left-[7.78%] right-[66.6%] top-[calc(50%+96.5px)]" : isPlaceholderOne ? "-translate-y-1/2 contents left-[10%] right-[70.9%] top-[calc(50%+97px)]" : '[word-break:break-word] font-["Open_Sans:Regular",sans-serif] font-normal inset-[55.47%_72.16%_29.43%_10%] leading-[0] text-[#263154] text-[14px] whitespace-pre-wrap'}`} style={isPlaceholderTwoOrPlaceholderThree ? { fontVariationSettings: '"wdth" 100' } : undefined}>
            <p className={isUnsecured ? '[word-break:break-word] absolute font-["Open_Sans:Bold",sans-serif] font-bold h-[23px] leading-[20px] left-[7.78%] right-[66.6%] text-[#263154] text-[16px] top-[calc(50%+85px)]' : isPlaceholderOne ? '[word-break:break-word] absolute font-["Open_Sans:Bold",sans-serif] font-bold h-[23px] leading-[20px] left-[10%] right-[70.9%] text-[#263154] text-[16px] top-[calc(50%+85.5px)]' : "leading-[normal] mb-0"} style={isPlaceholderOneOrUnsecured ? { fontVariationSettings: '"wdth" 100' } : undefined}>
              {isUnsecured ? "A1M Health " : isPlaceholderTwoOrPlaceholderThree ? "9025 Smoky Hollow Street " : "A1M Health "}
            </p>
            {isPlaceholderTwoOrPlaceholderThree && <p className="leading-[normal]">Niagara Falls, NY 14304</p>}
          </div>
          <p className={`[word-break:break-word] absolute font-["Open_Sans:Regular",sans-serif] font-normal ${isUnsecured ? "h-[15px] leading-[14px] left-[112px] text-[#565962] text-[12px] top-[calc(50%+110px)] w-[517px] whitespace-pre-wrap" : isPlaceholderOne ? "leading-[14px] left-[144px] text-[#565962] text-[12px] top-[calc(50%+110.5px)] whitespace-pre" : "leading-[0] left-[144px] text-[0px] text-black top-[109px] whitespace-nowrap"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
            {isPlaceholderTwoOrPlaceholderThree && (
              <>
                <span className="leading-[normal] text-[#263154] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>{`Email: `}</span>
                <span className="leading-[normal] text-[#0a7593] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
                  support@eldocomp.com
                </span>
              </>
            )}
            {isPlaceholderOneOrUnsecured && "Copyright © 2022 A1M Health  • CA Insurance License Number 0451271"}
          </p>
          <div className={`absolute ${isPlaceholderOneOrUnsecured ? "h-0 left-0 top-[210px] w-[1440px]" : "-translate-y-1/2 contents left-[10%] right-[70.9%] top-[calc(50%+97px)]"}`}>
            {isPlaceholderTwoOrPlaceholderThree && <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[23px] leading-[20px] left-[10%] right-[70.9%] text-[#263154] text-[16px] top-[calc(50%+85.5px)]" style={{ fontVariationSettings: '"wdth" 100' }}>{`A1M Health `}</p>}
            {isPlaceholderOneOrUnsecured && (
              <div className="absolute inset-[-1px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 1">
                  {isPlaceholderOne && <line id="Line 23" stroke="var(--stroke-0, #999999)" x2="1440" y1="0.5" y2="0.5" />}
                  {isUnsecured && (
                    <g id="Line 23">
                      <line stroke="var(--stroke-0, #6B6F7A)" x2="1440" y1="0.5" y2="0.5" />
                      <line stroke="var(--stroke-1, black)" strokeOpacity="0.2" x2="1440" y1="0.5" y2="0.5" />
                    </g>
                  )}
                </svg>
              </div>
            )}
          </div>
        </>
      )}
      {isPlaceholderTwoOrPlaceholderOneOrPlaceholderThree && (
        <p className={`[word-break:break-word] absolute ${isPlaceholderOne ? 'font-["Open_Sans:Bold",sans-serif] font-bold inset-[34.34%_30.14%_58.11%_53.26%] leading-[normal] text-[#263154] text-[16px]' : 'font-["Open_Sans:Regular",sans-serif] font-normal leading-[14px] left-[144px] text-[#565962] text-[12px] top-[calc(50%+110.5px)] whitespace-pre'}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          {isPlaceholderTwoOrPlaceholderThree ? "Copyright © 2022 A1M Health  • CA Insurance License Number 0451271" : "Get the Mobile Application"}
        </p>
      )}
      {isPlaceholderTwoOrPlaceholderThreeOrUnsecured && (
        <>
          <div className={`absolute ${isUnsecured ? "[word-break:break-word] contents left-[7.78%] right-[70.49%] text-[#263154] top-[20px]" : "h-0 left-0 top-[210px] w-[1440px]"}`}>
            <div className={`absolute ${isUnsecured ? 'font-["Open_Sans:Regular",sans-serif] font-normal inset-[18.05%_70.49%_74.44%_7.78%] leading-[0] text-[14px]' : "inset-[-1px_0_0_0]"}`} style={isUnsecured ? { fontVariationSettings: '"wdth" 100' } : undefined}>
              {isPlaceholderTwoOrPlaceholderThree && (
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 1">
                  <line id="Line 23" stroke="var(--stroke-0, #999999)" x2="1440" y1="0.5" y2="0.5" />
                </svg>
              )}
              {isUnsecured && (
                <>
                  <p className="leading-[normal] mb-0">For immediate assistance, please call:</p>
                  <p className="leading-[normal]">​</p>
                </>
              )}
            </div>
            {isUnsecured && (
              <>
                <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[20px] leading-[normal] left-[7.78%] right-[86.18%] text-[16px] top-[calc(50%-113px)]" style={{ fontVariationSettings: '"wdth" 100' }}>
                  Contact Us
                </p>
                <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[26.32%_70.49%_66.92%_7.78%] leading-[0] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                  <p className="leading-[normal] mb-0">1 (800) CALL-NOW | 1 (800) 121-2412</p>
                  <p className="leading-[normal] mb-0">​</p>
                  <p className="leading-[normal]">​</p>
                </div>
              </>
            )}
          </div>
          <div className={`[word-break:break-word] absolute contents top-[20px] ${isUnsecured ? "left-[29.51%] right-[62.92%]" : "left-[10%] right-[68.26%] text-[#263154]"}`}>
            <div className={`absolute font-["Open_Sans:Regular",sans-serif] font-normal leading-[0] text-[14px] ${isUnsecured ? "inset-[18.05%_62.92%_33.08%_29.51%] text-[#0a7593] whitespace-pre-wrap" : "inset-[18.11%_68.26%_74.34%_10%]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className={`mb-0 ${isUnsecured ? "leading-[32px]" : "leading-[normal]"}`}>{isUnsecured ? "Privacy Policy" : isPlaceholderTwoOrPlaceholderThree ? "For immediate assistance, please call:" : ""}</p>
              <p className={isUnsecured ? "leading-[32px] mb-0" : "leading-[normal]"}>{isUnsecured ? "Terms of Use " : isPlaceholderTwoOrPlaceholderThree ? "​" : ""}</p>
              {isUnsecured && (
                <>
                  <p className="leading-[32px] mb-0">Legal</p>
                  <p className="leading-[32px] mb-0">{`Contact Us `}</p>
                  <p className="leading-[32px]">​</p>
                </>
              )}
            </div>
            <p className={`absolute font-["Open_Sans:Bold",sans-serif] font-bold leading-[normal] text-[16px] ${isUnsecured ? "left-[29.51%] right-[66.46%] text-[#263154] top-[calc(50%-113px)] whitespace-nowrap" : "h-[20px] left-[10%] right-[83.96%] top-[calc(50%-112.5px)]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
              {isUnsecured ? "Block 1" : isPlaceholderTwoOrPlaceholderThree ? "Contact Us" : ""}
            </p>
            {isPlaceholderTwoOrPlaceholderThree && (
              <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[26.42%_68.26%_66.42%_10%] leading-[0] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="leading-[normal] mb-0">1 (800) CALL-NOW | 1 (800) 121-2412</p>
                <p className="leading-[normal] mb-0">​</p>
                <p className="leading-[normal]">​</p>
              </div>
            )}
          </div>
        </>
      )}
      {isPlaceholderThreeOrUnsecured && (
        <>
          <div className={`[word-break:break-word] absolute contents top-[20px] ${isUnsecured ? "left-[43.89%] right-[48.54%]" : "left-[31.74%] right-[60.69%]"}`}>
            <div className={`absolute font-["Open_Sans:Regular",sans-serif] font-normal leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap ${isUnsecured ? "inset-[18.05%_48.54%_33.08%_43.89%]" : "inset-[18.11%_60.69%_32.83%_31.74%]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[32px] mb-0">Privacy Policy</p>
              <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
              <p className="leading-[32px] mb-0">Legal</p>
              <p className="leading-[32px] mb-0">{`Contact Us `}</p>
              <p className="leading-[32px]">​</p>
            </div>
            <p className={`absolute font-["Open_Sans:Bold",sans-serif] font-bold leading-[normal] text-[#263154] text-[16px] whitespace-nowrap ${isUnsecured ? "left-[43.89%] right-[52.08%] top-[calc(50%-113px)]" : "left-[31.74%] right-[64.24%] top-[calc(50%-112.5px)]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
              {isUnsecured ? "Block 2" : isPlaceholderThree ? "Block 1" : ""}
            </p>
          </div>
          <div className={`[word-break:break-word] absolute contents top-[20px] ${isUnsecured ? "left-[58.33%] right-[34.1%]" : "left-[46.11%] right-[46.32%]"}`}>
            <div className={`absolute font-["Open_Sans:Regular",sans-serif] font-normal leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap ${isUnsecured ? "inset-[18.05%_34.1%_33.08%_58.33%]" : "inset-[18.11%_46.32%_32.83%_46.11%]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[32px] mb-0">Privacy Policy</p>
              <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
              <p className="leading-[32px] mb-0">Legal</p>
              <p className="leading-[32px] mb-0">{`Contact Us `}</p>
              <p className="leading-[32px]">​</p>
            </div>
            <p className={`absolute font-["Open_Sans:Bold",sans-serif] font-bold leading-[normal] text-[#263154] text-[16px] whitespace-nowrap ${isUnsecured ? "left-[58.33%] right-[37.64%] top-[calc(50%-113px)]" : "left-[46.11%] right-[49.86%] top-[calc(50%-112.5px)]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
              {isUnsecured ? "Block 3" : isPlaceholderThree ? "Block 2" : ""}
            </p>
          </div>
          <div className={`absolute contents top-[20px] ${isUnsecured ? "left-[1048px]" : "[word-break:break-word] left-[60.56%] right-[31.88%]"}`}>
            {isPlaceholderThree && (
              <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.11%_31.88%_32.83%_60.56%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="leading-[32px] mb-0">Privacy Policy</p>
                <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
                <p className="leading-[32px] mb-0">Legal</p>
                <p className="leading-[32px] mb-0">{`Contact Us `}</p>
                <p className="leading-[32px]">​</p>
              </div>
            )}
            <p className={`absolute font-["Open_Sans:Bold",sans-serif] font-bold leading-[normal] text-[#263154] text-[16px] whitespace-nowrap ${isUnsecured ? "[word-break:break-word] left-[72.78%] right-[18.54%] top-[calc(50%-113px)]" : "left-[60.56%] right-[35.42%] top-[calc(50%-112.5px)]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
              {isUnsecured ? "Stay Connected" : isPlaceholderThree ? "Block 3" : ""}
            </p>
            {isUnsecured && (
              <div className="absolute content-stretch flex gap-[16px] items-center left-[1048px] top-[55px]">
                <div className="h-[15.2px] relative shrink-0 w-[20px]" data-name="📷 facebook">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 15.2">
                    <g id="ð· facebook">
                      <path clipRule="evenodd" d={svgPaths.p3d60a00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="facebook" />
                    </g>
                  </svg>
                </div>
                <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-[20px]" data-name="prime:twitter">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
                    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
                      <div className="col-1 h-[12.688px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.656px] mask-size-[14px_14px] ml-0 mt-[0.66px] relative row-1 w-[14px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12.688">
                          <g id="Group">
                            <path d={svgPaths.p1d6b7300} fill="var(--fill-0, #263154)" id="Vector" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[14px] relative shrink-0 w-[20px]" data-name="XMLID_823_">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
                    <path clipRule="evenodd" d={svgPaths.p326bd400} fill="var(--fill-0, #263154)" fillRule="evenodd" id="XMLID_823_" />
                  </svg>
                </div>
                <div className="h-[16px] relative shrink-0 w-[20px]" data-name="linkedin">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
                    <g id="linkedin">
                      <path clipRule="evenodd" d={svgPaths.p8b5ce00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="Shape" />
                    </g>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {isPlaceholderTwoOrPlaceholderThree && (
        <p className={`[word-break:break-word] absolute font-["Open_Sans:Bold",sans-serif] font-bold leading-[normal] text-[#263154] text-[16px] ${isPlaceholderThree ? "inset-[7.55%_8.33%_84.91%_75.07%]" : "inset-[34.34%_51.74%_58.11%_31.67%]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          Get the Mobile Application
        </p>
      )}
      {isPlaceholderTwoOrPlaceholderOneOrPlaceholderThree && (
        <>
          <div className={`absolute ${isPlaceholderThree ? "inset-[21.13%_10.49%_66.79%_81.81%]" : isPlaceholderOne ? "inset-[47.92%_32.29%_40%_60%]" : "inset-[47.92%_53.89%_40%_38.4%]"}`} data-name="Google Play Badge US">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 111 32">
              <g id="Google Play Badge US">
                <rect fill="var(--fill-0, #263154)" height="32" id="Background Black" rx="5" width="111" />
                <path d={svgPaths.p2632eb80} fill="var(--fill-0, #999999)" id="Border Gray" />
                <path d={svgPaths.p22529870} fill="var(--fill-0, white)" id="Google Play" />
                <g id="GET IT ON">
                  <path clipRule="evenodd" d={svgPaths.p38f0b0f0} fill="var(--fill-0, white)" fillRule="evenodd" />
                  <path d={svgPaths.pba33300} fill="var(--stroke-0, white)" />
                </g>
                <g id="Icon">
                  <path d={svgPaths.p3247de00} fill="url(#paint0_linear_10_5281)" id="Shape" />
                  <path d={svgPaths.p211ff5c0} fill="url(#paint1_linear_10_5281)" id="Shape_2" />
                  <path d={svgPaths.p34d3eaec} fill="url(#paint2_linear_10_5281)" id="Shape_3" />
                  <path d={svgPaths.p3d90f900} fill="url(#paint3_linear_10_5281)" id="Shape_4" />
                  <path d={svgPaths.p2e74de00} fill="var(--fill-0, #263154)" id="Shape_5" opacity="0.2" />
                  <path d={svgPaths.p5b93500} fill="var(--fill-0, #263154)" id="Shape_6" opacity="0.12" />
                  <path d={svgPaths.p1199ca80} fill="var(--fill-0, white)" id="Shape_7" opacity="0.25" />
                </g>
              </g>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10_5281" x1="14.3753" x2="-1.87662" y1="-6.04662" y2="-1.60432">
                  <stop stopColor="#00A0FF" />
                  <stop offset="0.01" stopColor="#00A1FF" />
                  <stop offset="0.26" stopColor="#00BEFF" />
                  <stop offset="0.51" stopColor="#00D2FF" />
                  <stop offset="0.76" stopColor="#00DFFF" />
                  <stop offset="1" stopColor="#00E3FF" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10_5281" x1="27.8223" x2="7.9328" y1="7.8409" y2="7.8409">
                  <stop stopColor="#FFE000" />
                  <stop offset="0.41" stopColor="#FFBD00" />
                  <stop offset="0.78" stopColor="#FFA500" />
                  <stop offset="1" stopColor="#FF9C00" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_10_5281" x1="8.29766" x2="-4.2821" y1="10.822" y2="32.5701">
                  <stop stopColor="#FF3A44" />
                  <stop offset="1" stopColor="#C31162" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_10_5281" x1="0.593331" x2="6.20829" y1="3.27743" y2="12.9889">
                  <stop stopColor="#32A071" />
                  <stop offset="0.07" stopColor="#2DA771" />
                  <stop offset="0.48" stopColor="#15CF74" />
                  <stop offset="0.8" stopColor="#06E775" />
                  <stop offset="1" stopColor="#00F076" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className={`absolute ${isPlaceholderThree ? "inset-[21.13%_18.75%_66.79%_75.07%]" : isPlaceholderOne ? "inset-[47.92%_40.56%_40%_53.26%]" : "inset-[47.92%_62.15%_40%_31.67%]"}`} data-name="App Store Badge US Black">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 32">
              <g id="App Store Badge US Black">
                <path d={svgPaths.p30285a80} fill="var(--fill-0, #999999)" id="Background Gray" />
                <path d={svgPaths.p2e6c3100} fill="var(--fill-0, #263154)" id="Background Black" />
                <path d={svgPaths.p27462500} fill="var(--fill-0, white)" id="App Store" />
                <path d={svgPaths.p12d66f80} fill="var(--fill-0, white)" id="Download on the" />
                <path d={svgPaths.p355a5900} fill="var(--fill-0, white)" id="Icon" />
              </g>
            </svg>
          </div>
        </>
      )}
      {isPlaceholderTwo && (
        <>
          <div className="-translate-y-1/2 absolute contents left-[31.67%] right-[59.65%] top-[calc(50%-101.5px)]">
            <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[31.67%] right-[59.65%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Stay Connected
            </p>
          </div>
          <div className="absolute content-stretch flex gap-[16px] items-center left-[456px] top-[55px]">
            <div className="h-[15.2px] relative shrink-0 w-[20px]" data-name="📷 facebook">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 15.2">
                <g id="ð· facebook">
                  <path clipRule="evenodd" d={svgPaths.p3d60a00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="facebook" />
                </g>
              </svg>
            </div>
            <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-[20px]" data-name="prime:twitter">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
                <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
                  <div className="col-1 h-[12.688px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.656px] mask-size-[14px_14px] ml-0 mt-[0.66px] relative row-1 w-[14px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12.688">
                      <g id="Group">
                        <path d={svgPaths.p1d6b7300} fill="var(--fill-0, #263154)" id="Vector" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[14px] relative shrink-0 w-[20px]" data-name="XMLID_823_">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
                <path clipRule="evenodd" d={svgPaths.p326bd400} fill="var(--fill-0, #263154)" fillRule="evenodd" id="XMLID_823_" />
              </svg>
            </div>
            <div className="h-[16px] relative shrink-0 w-[20px]" data-name="linkedin">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
                <g id="linkedin">
                  <path clipRule="evenodd" d={svgPaths.p8b5ce00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="Shape" />
                </g>
              </svg>
            </div>
          </div>
        </>
      )}
      {isPlaceholderOne && (
        <>
          <div className="absolute contents left-[767px] top-[20px]">
            <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[53.26%] right-[38.06%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Stay Connected
            </p>
            <div className="absolute content-stretch flex gap-[16px] items-center left-[767px] top-[55px]">
              <div className="h-[15.2px] relative shrink-0 w-[20px]" data-name="📷 facebook">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 15.2">
                  <g id="ð· facebook">
                    <path clipRule="evenodd" d={svgPaths.p3d60a00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="facebook" />
                  </g>
                </svg>
              </div>
              <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-[20px]" data-name="prime:twitter">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
                  <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
                    <div className="col-1 h-[12.688px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.656px] mask-size-[14px_14px] ml-0 mt-[0.66px] relative row-1 w-[14px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12.688">
                        <g id="Group">
                          <path d={svgPaths.p1d6b7300} fill="var(--fill-0, #263154)" id="Vector" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[14px] relative shrink-0 w-[20px]" data-name="XMLID_823_">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
                  <path clipRule="evenodd" d={svgPaths.p326bd400} fill="var(--fill-0, #263154)" fillRule="evenodd" id="XMLID_823_" />
                </svg>
              </div>
              <div className="h-[16px] relative shrink-0 w-[20px]" data-name="linkedin">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
                  <g id="linkedin">
                    <path clipRule="evenodd" d={svgPaths.p8b5ce00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="Shape" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] absolute contents left-[10%] right-[82.43%] top-[20px]">
            <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.11%_82.43%_32.83%_10%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[32px] mb-0">Privacy Policy</p>
              <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
              <p className="leading-[32px] mb-0">Legal</p>
              <p className="leading-[32px] mb-0">{`Contact Us `}</p>
              <p className="leading-[32px]">​</p>
            </div>
            <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[10%] right-[85.97%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Block 1
            </p>
          </div>
          <div className="[word-break:break-word] absolute contents left-[24.38%] right-[68.06%] top-[20px]">
            <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.11%_68.06%_32.83%_24.38%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[32px] mb-0">Privacy Policy</p>
              <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
              <p className="leading-[32px] mb-0">Legal</p>
              <p className="leading-[32px] mb-0">{`Contact Us `}</p>
              <p className="leading-[32px]">​</p>
            </div>
            <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[24.38%] right-[71.6%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Block 2
            </p>
          </div>
          <div className="[word-break:break-word] absolute contents left-[38.82%] right-[53.61%] top-[20px]">
            <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.11%_53.61%_32.83%_38.82%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[32px] mb-0">Privacy Policy</p>
              <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
              <p className="leading-[32px] mb-0">Legal</p>
              <p className="leading-[32px] mb-0">{`Contact Us `}</p>
              <p className="leading-[32px]">​</p>
            </div>
            <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[38.82%] right-[57.15%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Block 3
            </p>
          </div>
        </>
      )}
      {isPlaceholderFour && (
        <>
          <div className="absolute bg-[#fff2f8] inset-0" data-name="Rectangle Copy" />
          <div className="absolute content-stretch flex gap-[16px] items-center left-[143px] top-[58px]">
            <div className="h-[15.2px] relative shrink-0 w-[20px]" data-name="📷 facebook">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 15.2">
                <g id="ð· facebook">
                  <path clipRule="evenodd" d={svgPaths.p3d60a00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="facebook" />
                </g>
              </svg>
            </div>
            <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-[20px]" data-name="prime:twitter">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
                <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
                  <div className="col-1 h-[12.688px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.656px] mask-size-[14px_14px] ml-0 mt-[0.66px] relative row-1 w-[14px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12.688">
                      <g id="Group">
                        <path d={svgPaths.p1d6b7300} fill="var(--fill-0, #263154)" id="Vector" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[14px] relative shrink-0 w-[20px]" data-name="XMLID_823_">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
                <path clipRule="evenodd" d={svgPaths.p326bd400} fill="var(--fill-0, #263154)" fillRule="evenodd" id="XMLID_823_" />
              </svg>
            </div>
            <div className="h-[16px] relative shrink-0 w-[20px]" data-name="linkedin">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
                <g id="linkedin">
                  <path clipRule="evenodd" d={svgPaths.p8b5ce00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="Shape" />
                </g>
              </svg>
            </div>
          </div>
          <div className="absolute bottom-[10px] h-[30px] left-[1162px] w-[100px]" data-name="image 3">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
          </div>
          <p className="[word-break:break-word] absolute bottom-[33px] font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] left-[1081px] text-[#565962] text-[12px] translate-y-full whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            Powered by
          </p>
          <div className="-translate-y-1/2 absolute contents left-[10%] right-[70.9%] top-[calc(50%+97px)]">
            <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[23px] leading-[20px] left-[10%] right-[70.9%] text-[#263154] text-[16px] top-[calc(50%+85.5px)]" style={{ fontVariationSettings: '"wdth" 100' }}>{`A1M Health `}</p>
          </div>
          <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[14px] left-[144px] text-[#565962] text-[12px] top-[calc(50%+110.5px)] whitespace-pre" style={{ fontVariationSettings: '"wdth" 100' }}>{`Copyright © 2022 A1M Health  • CA Insurance License Number 0451271`}</p>
          <div className="absolute h-0 left-0 top-[210px] w-[1440px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 1">
                <line id="Line 23" stroke="var(--stroke-0, #999999)" x2="1440" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </>
      )}
      {["Placeholder Four", "Unsecured"].includes(property1) && (
        <p className={`[word-break:break-word] absolute text-[#263154] ${isUnsecured ? 'font-["Open_Sans:Regular",sans-serif] font-normal inset-[40.6%_75.28%_52.63%_7.78%] leading-[0] text-[0px]' : 'font-["Open_Sans:Bold",sans-serif] font-bold inset-[34.34%_73.4%_58.11%_10%] leading-[normal] text-[16px]'}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          {isPlaceholderFour && "Get the Mobile Application"}
          {isUnsecured && (
            <>
              <span className="leading-[normal] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>{`Email: `}</span>
              <span className="leading-[normal] text-[#0a7593] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
                support@eldocomp.com
              </span>
            </>
          )}
        </p>
      )}
      {isPlaceholderFour && (
        <>
          <div className="absolute inset-[47.92%_75.56%_40%_16.74%]" data-name="Google Play Badge US">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 111 32">
              <g id="Google Play Badge US">
                <rect fill="var(--fill-0, #263154)" height="32" id="Background Black" rx="5" width="111" />
                <path d={svgPaths.p2632eb80} fill="var(--fill-0, #999999)" id="Border Gray" />
                <path d={svgPaths.p22529870} fill="var(--fill-0, white)" id="Google Play" />
                <g id="GET IT ON">
                  <path clipRule="evenodd" d={svgPaths.p38f0b0f0} fill="var(--fill-0, white)" fillRule="evenodd" />
                  <path d={svgPaths.pba33300} fill="var(--stroke-0, white)" />
                </g>
                <g id="Icon">
                  <path d={svgPaths.p3247de00} fill="url(#paint0_linear_10_5281)" id="Shape" />
                  <path d={svgPaths.p211ff5c0} fill="url(#paint1_linear_10_5281)" id="Shape_2" />
                  <path d={svgPaths.p34d3eaec} fill="url(#paint2_linear_10_5281)" id="Shape_3" />
                  <path d={svgPaths.p3d90f900} fill="url(#paint3_linear_10_5281)" id="Shape_4" />
                  <path d={svgPaths.p2e74de00} fill="var(--fill-0, #263154)" id="Shape_5" opacity="0.2" />
                  <path d={svgPaths.p5b93500} fill="var(--fill-0, #263154)" id="Shape_6" opacity="0.12" />
                  <path d={svgPaths.p1199ca80} fill="var(--fill-0, white)" id="Shape_7" opacity="0.25" />
                </g>
              </g>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10_5281" x1="14.3753" x2="-1.87662" y1="-6.04662" y2="-1.60432">
                  <stop stopColor="#00A0FF" />
                  <stop offset="0.01" stopColor="#00A1FF" />
                  <stop offset="0.26" stopColor="#00BEFF" />
                  <stop offset="0.51" stopColor="#00D2FF" />
                  <stop offset="0.76" stopColor="#00DFFF" />
                  <stop offset="1" stopColor="#00E3FF" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10_5281" x1="27.8223" x2="7.9328" y1="7.8409" y2="7.8409">
                  <stop stopColor="#FFE000" />
                  <stop offset="0.41" stopColor="#FFBD00" />
                  <stop offset="0.78" stopColor="#FFA500" />
                  <stop offset="1" stopColor="#FF9C00" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_10_5281" x1="8.29766" x2="-4.2821" y1="10.822" y2="32.5701">
                  <stop stopColor="#FF3A44" />
                  <stop offset="1" stopColor="#C31162" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_10_5281" x1="0.593331" x2="6.20829" y1="3.27743" y2="12.9889">
                  <stop stopColor="#32A071" />
                  <stop offset="0.07" stopColor="#2DA771" />
                  <stop offset="0.48" stopColor="#15CF74" />
                  <stop offset="0.8" stopColor="#06E775" />
                  <stop offset="1" stopColor="#00F076" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute inset-[47.92%_83.82%_40%_10%]" data-name="App Store Badge US Black">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 32">
              <g id="App Store Badge US Black">
                <path d={svgPaths.p30285a80} fill="var(--fill-0, #999999)" id="Background Gray" />
                <path d={svgPaths.p2e6c3100} fill="var(--fill-0, #263154)" id="Background Black" />
                <path d={svgPaths.p27462500} fill="var(--fill-0, white)" id="App Store" />
                <path d={svgPaths.p12d66f80} fill="var(--fill-0, white)" id="Download on the" />
                <path d={svgPaths.p355a5900} fill="var(--fill-0, white)" id="Icon" />
              </g>
            </svg>
          </div>
          <div className="-translate-y-1/2 absolute contents left-[10%] right-[81.32%] top-[calc(50%-101.5px)]">
            <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[10%] right-[81.32%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Stay Connected
            </p>
          </div>
        </>
      )}
      {isUnsecured && (
        <div className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[54.89%_74.39%_30.08%_7.78%] leading-[0] text-[#263154] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          <p className="leading-[normal] mb-0">{`9025 Smoky Hollow Street `}</p>
          <p className="leading-[normal]">Niagara Falls, NY 14304</p>
        </div>
      )}
    </div>
  );
}