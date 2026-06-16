import svgPaths from "./svg-8vrbzbfzhc";
import { imgGroup } from "./svg-jyd2r";
type MobileFooterProps = {
  className?: string;
  property1?: "Footer 2" | "Footer 1";
};

export default function MobileFooter({ className, property1 = "Footer 1" }: MobileFooterProps) {
  const isFooter1 = property1 === "Footer 1";
  const isFooter2 = property1 === "Footer 2";
  return (
    <div className={className || `relative w-[375px] ${isFooter2 ? "h-[646px]" : "h-[620px]"}`}>
      <div className="absolute bg-[#fff2f8] inset-0" data-name="Rectangle Copy" />
      <div className={`absolute ${isFooter2 ? "[word-break:break-word] contents left-[4.27%] right-[12.27%] text-[#263154] top-[20px]" : "content-stretch flex gap-[16px] items-center left-[calc(50%+5.5px)] top-[405px]"}`}>
        {isFooter1 && (
          <>
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
          </>
        )}
        {isFooter2 && (
          <>
            <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[8.05%_12.27%_88.85%_4.27%] leading-[0] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[normal] mb-0">For immediate assistance, please call:</p>
              <p className="leading-[normal]">​</p>
            </div>
            <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[20px] leading-[normal] left-[4.27%] right-[72.53%] text-[16px] top-[calc(50%-303px)]" style={{ fontVariationSettings: '"wdth" 100' }}>
              Contact Us
            </p>
            <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[11.38%_12.27%_78.95%_4.27%] leading-[0] text-[0px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[normal] mb-0 text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
                1 (800) CALL-NOW | 1 (800) 121-2412
              </p>
              <p className="leading-[normal] mb-0 text-[14px]">​</p>
              <p className="text-[14px]">
                <span className="leading-[normal]" style={{ fontVariationSettings: '"wdth" 100' }}>{`Email: `}</span>
                <span className="leading-[normal] text-[#0a7593]" style={{ fontVariationSettings: '"wdth" 100' }}>
                  support@eldocomp.com
                </span>
              </p>
            </div>
          </>
        )}
      </div>
      {isFooter1 && (
        <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[17.1%_12.27%_79.68%_4.27%] leading-[0] text-[#263154] text-[0px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          <span className="leading-[normal] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>{`Email: `}</span>
          <span className="leading-[normal] text-[#0a7593] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            support@eldocomp.com
          </span>
        </p>
      )}
      <div className={`absolute contents ${isFooter2 ? "inset-[21.98%_11.47%_72.14%_4.27%]" : "[word-break:break-word] left-[4.27%] right-[12.27%] text-[#263154] top-[20px]"}`}>
        {isFooter1 && (
          <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[8.39%_12.27%_88.39%_4.27%] leading-[0] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            <p className="leading-[normal] mb-0">For immediate assistance, please call:</p>
            <p className="leading-[normal]">​</p>
          </div>
        )}
        <p className={`absolute leading-[normal] ${isFooter2 ? '[word-break:break-word] font-["Open_Sans:Regular",sans-serif] font-normal inset-[21.98%_11.47%_72.14%_4.27%] text-[#263154] text-[14px]' : 'font-["Open_Sans:Bold",sans-serif] font-bold h-[20px] left-[4.27%] right-[72.53%] text-[16px] top-[calc(50%-290px)]'}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          {isFooter2 ? "9025 Smoky Hollow Street, Niagara Falls, NY 14304" : "Contact Us"}
        </p>
        {isFooter1 && (
          <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[11.94%_12.27%_85.48%_4.27%] leading-[0] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            <p className="leading-[normal] mb-0">1 (800) CALL-NOW | 1 (800) 121-2412</p>
            <p className="leading-[normal] mb-0">​</p>
            <p className="leading-[normal]">​</p>
          </div>
        )}
      </div>
      <div className={`absolute contents ${isFooter2 ? "[word-break:break-word] left-[4.27%] right-[52%] top-[196px]" : "inset-[22.9%_11.47%_70.97%_4.27%]"}`}>
        {isFooter1 && (
          <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[22.9%_11.47%_70.97%_4.27%] leading-[normal] text-[#263154] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            9025 Smoky Hollow Street, Niagara Falls, NY 14304
          </p>
        )}
        {isFooter2 && (
          <>
            <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[34.67%_52%_45.2%_4.27%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[32px] mb-0">Privacy Policy</p>
              <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
              <p className="leading-[32px] mb-0">Legal</p>
              <p className="leading-[32px] mb-0">{`Contact Us `}</p>
              <p className="leading-[32px]">​</p>
            </div>
            <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[4.27%] right-[80.27%] text-[#263154] text-[16px] top-[calc(50%-127px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Block 1
            </p>
          </>
        )}
      </div>
      <div className={`[word-break:break-word] absolute contents left-[4.27%] ${isFooter2 ? "right-[66.67%] top-[374px]" : "right-[52%] top-[196px]"}`}>
        <div className={`absolute font-["Open_Sans:Regular",sans-serif] font-normal leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap ${isFooter2 ? "inset-[62.23%_66.67%_17.65%_4.27%]" : "inset-[36.13%_52%_42.9%_4.27%]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          <p className="leading-[32px] mb-0">Privacy Policy</p>
          <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
          <p className="leading-[32px] mb-0">Legal</p>
          <p className="leading-[32px] mb-0">{`Contact Us `}</p>
          <p className="leading-[32px]">​</p>
        </div>
        <p className={`absolute font-["Open_Sans:Bold",sans-serif] font-bold leading-[normal] left-[4.27%] right-[80.27%] text-[#263154] text-[16px] whitespace-nowrap ${isFooter2 ? "top-[calc(50%+51px)]" : "top-[calc(50%-114px)]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          Block 1
        </p>
      </div>
      <div className={`[word-break:break-word] absolute contents ${isFooter2 ? "left-[52.27%] right-[18.67%] top-[196px]" : "left-[4.27%] right-[66.67%] top-[374px]"}`}>
        <div className={`absolute font-["Open_Sans:Regular",sans-serif] font-normal leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap ${isFooter2 ? "inset-[34.67%_18.67%_45.2%_52.27%]" : "inset-[64.84%_66.67%_14.19%_4.27%]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          <p className="leading-[32px] mb-0">Privacy Policy</p>
          <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
          <p className="leading-[32px] mb-0">Legal</p>
          <p className="leading-[32px] mb-0">{`Contact Us `}</p>
          <p className="leading-[32px]">​</p>
        </div>
        <p className={`absolute font-["Open_Sans:Bold",sans-serif] font-bold leading-[normal] text-[#263154] text-[16px] whitespace-nowrap ${isFooter2 ? "left-[52.27%] right-[32.27%] top-[calc(50%-127px)]" : "left-[4.27%] right-[80.27%] top-[calc(50%+64px)]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          {isFooter2 ? "Block 2" : "Block 1"}
        </p>
      </div>
      <div className={`absolute ${isFooter2 ? "h-0 left-0 top-[573px] w-[375px]" : "[word-break:break-word] contents left-[52.27%] right-[18.67%] top-[196px]"}`}>
        <div className={`absolute ${isFooter2 ? "inset-[-1px_0_0_0]" : 'font-["Open_Sans:Regular",sans-serif] font-normal inset-[36.13%_18.67%_42.9%_52.27%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap'}`} style={isFooter1 ? { fontVariationSettings: '"wdth" 100' } : undefined}>
          {isFooter1 && (
            <>
              <p className="leading-[32px] mb-0">Privacy Policy</p>
              <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
              <p className="leading-[32px] mb-0">Legal</p>
              <p className="leading-[32px] mb-0">{`Contact Us `}</p>
              <p className="leading-[32px]">​</p>
            </>
          )}
          {isFooter2 && (
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 375 1">
              <line id="Line 35" stroke="var(--stroke-0, #999999)" x2="375" y1="0.5" y2="0.5" />
            </svg>
          )}
        </div>
        {isFooter1 && (
          <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[52.27%] right-[32.27%] text-[#263154] text-[16px] top-[calc(50%-114px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            Block 2
          </p>
        )}
      </div>
      {isFooter1 && (
        <>
          <div className="absolute h-0 left-0 top-[548px] w-[375px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 375 1">
                <line id="Line 35" stroke="var(--stroke-0, #999999)" x2="375" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
          <div className="-translate-y-1/2 absolute contents left-[52.27%] right-[14.4%] top-[calc(50%+75px)]">
            <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[52.27%] right-[14.4%] text-[#263154] text-[16px] top-[calc(50%+64px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Stay Connected
            </p>
          </div>
          <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[14px] left-[16px] text-[#565962] text-[12px] top-[calc(50%+271px)] w-[343px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>{`Copyright © 2022 A1M Health  • CA Insurance License Number 0451271`}</p>
          <div className="-translate-y-1/2 absolute contents left-[4.27%] right-[4.27%] top-[calc(50%+257px)]">
            <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[20px] left-[4.27%] right-[4.27%] text-[#263154] text-[16px] top-[calc(50%+247px)]" style={{ fontVariationSettings: '"wdth" 100' }}>{`A1M Health `}</p>
          </div>
        </>
      )}
      {isFooter2 && (
        <>
          <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[14px] left-[16px] text-[#565962] text-[12px] top-[calc(50%+283px)] w-[343px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>{`Copyright © 2022 A1M Health  • CA Insurance License Number 0451271`}</p>
          <div className="-translate-y-1/2 absolute contents left-[4.27%] right-[4.27%] top-[calc(50%+269px)]">
            <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[20px] left-[4.27%] right-[4.27%] text-[#263154] text-[16px] top-[calc(50%+259px)]" style={{ fontVariationSettings: '"wdth" 100' }}>{`A1M Health `}</p>
          </div>
          <div className="absolute contents left-[calc(50%+5.5px)] top-[374px]">
            <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[52.27%] right-[14.4%] text-[#263154] text-[16px] top-[calc(50%+51px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Stay Connected
            </p>
            <div className="absolute content-stretch flex gap-[16px] items-center left-[calc(50%+5.5px)] top-[407px]">
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
          <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold inset-[68.27%_2.13%_28.64%_52.27%] leading-[normal] text-[#263154] text-[16px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Get the Mobile App
          </p>
          <div className="absolute inset-[80.03%_9.87%_13.78%_52.27%]" data-name="Google Play Badge US">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 142 40">
              <g id="Google Play Badge US">
                <rect fill="var(--fill-0, #263154)" height="40" id="Background Black" rx="5" width="142" />
                <path d={svgPaths.p3a6e5200} fill="var(--fill-0, #999999)" id="Border Gray" />
                <path d={svgPaths.p3eab8100} fill="var(--fill-0, white)" id="Google Play" />
                <g id="GET IT ON">
                  <path clipRule="evenodd" d={svgPaths.p141af000} fill="var(--fill-0, white)" fillRule="evenodd" />
                  <path d={svgPaths.p2c89000} fill="var(--stroke-0, white)" />
                </g>
                <g id="Icon">
                  <path d={svgPaths.p26224000} fill="url(#paint0_linear_10_5540)" id="Shape" />
                  <path d={svgPaths.p25896680} fill="url(#paint1_linear_10_5540)" id="Shape_2" />
                  <path d={svgPaths.p2dcab5c0} fill="url(#paint2_linear_10_5540)" id="Shape_3" />
                  <path d={svgPaths.p2d925300} fill="url(#paint3_linear_10_5540)" id="Shape_4" />
                  <path d={svgPaths.p30ea3500} fill="var(--fill-0, #263154)" id="Shape_5" opacity="0.2" />
                  <path d={svgPaths.p2cd4fc80} fill="var(--fill-0, #263154)" id="Shape_6" opacity="0.12" />
                  <path d={svgPaths.p20c91300} fill="var(--fill-0, white)" id="Shape_7" opacity="0.25" />
                </g>
              </g>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10_5540" x1="18.3911" x2="-2.33143" y1="-7.55919" y2="-1.76224">
                  <stop stopColor="#00A0FF" />
                  <stop offset="0.01" stopColor="#00A1FF" />
                  <stop offset="0.26" stopColor="#00BEFF" />
                  <stop offset="0.51" stopColor="#00D2FF" />
                  <stop offset="0.76" stopColor="#00DFFF" />
                  <stop offset="1" stopColor="#00E3FF" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10_5540" x1="35.5939" x2="10.1494" y1="9.79941" y2="9.79941">
                  <stop stopColor="#FFE000" />
                  <stop offset="0.41" stopColor="#FFBD00" />
                  <stop offset="0.78" stopColor="#FFA500" />
                  <stop offset="1" stopColor="#FF9C00" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_10_5540" x1="10.6159" x2="-4.92522" y1="13.527" y2="41.0241">
                  <stop stopColor="#FF3A44" />
                  <stop offset="1" stopColor="#C31162" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_10_5540" x1="0.761248" x2="7.69795" y1="4.09606" y2="16.3747">
                  <stop stopColor="#32A071" />
                  <stop offset="0.07" stopColor="#2DA771" />
                  <stop offset="0.48" stopColor="#15CF74" />
                  <stop offset="0.8" stopColor="#06E775" />
                  <stop offset="1" stopColor="#00F076" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute inset-[72.6%_17.87%_21.21%_52.27%]" data-name="App Store Badge US Black">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 112 40.0001">
              <g id="App Store Badge US Black">
                <path d={svgPaths.p2eceb200} fill="var(--fill-0, #999999)" id="Background Gray" />
                <path d={svgPaths.p32412d00} fill="var(--fill-0, #263154)" id="Background Black" />
                <path d={svgPaths.p8a57f80} fill="var(--fill-0, white)" id="App Store" />
                <path d={svgPaths.p8e47500} fill="var(--fill-0, white)" id="Download on the" />
                <path d={svgPaths.p2ef3e80} fill="var(--fill-0, white)" id="Icon" />
              </g>
            </svg>
          </div>
        </>
      )}
    </div>
  );
}