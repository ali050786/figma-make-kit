import svgPaths from "./svg-47mxa9zv1t";
import imgDownload1 from "./948fb7f1a82164701b58a55f2f3d7d39fa029500.png";
import imgKeenanLogo1 from "./268260c7c4b29dd81e298ecb1511858d1fbd3c50.png";
import { imgBkgd, imgBkgd1 } from "./svg-4iv0a";
type LogoProps = {
  className?: string;
  logo?: "A1M" | "mobile A1M" | "Aptia";
};

function Logo({ className, logo = "A1M" }: LogoProps) {
  const isAptia = logo === "Aptia";
  const isMobileA1M = logo === "mobile A1M";
  return (
    <div className={className || `content-stretch flex flex-col items-start justify-center relative ${isMobileA1M ? "h-[48px] w-[180px]" : isAptia ? "h-[86px] w-[240px]" : "h-[86px]"}`}>
      {["A1M", "mobile A1M"].includes(logo) && (
        <div className={`relative shrink-0 ${isMobileA1M ? "h-[40.05px] w-[178px]" : "h-[54px] w-[240px]"}`}>
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox={isMobileA1M ? "0 0 178 40.0501" : "0 0 240 54"}>
            <g id="Group 1">
              <rect fill="var(--fill-0, #82479D)" height={isMobileA1M ? "32.6939" : "44.0816"} id="Rectangle" width={isMobileA1M ? "61.0615" : "82.33"} x={isMobileA1M ? "36.1552" : "48.7485"} />
              <path d={isMobileA1M ? svgPaths.p1c04ec0 : svgPaths.p3cfc9d00} fill="var(--fill-0, #BED34F)" id="Combined Shape" />
              <g id="Health Insurance">
                <path d={isMobileA1M ? svgPaths.p15562400 : svgPaths.pd6a2880} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p3bf1f380 : svgPaths.p15ba9c00} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p2b918a30 : svgPaths.p3bff9900} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p39466b40 : svgPaths.p4f5e480} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p21bc7e00 : svgPaths.p26346b00} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p2f526270 : svgPaths.p2f325480} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p2a0ac600 : svgPaths.pb20da00} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p3c127600 : svgPaths.p2de3d800} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p17c607e0 : svgPaths.p364197c0} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p24996380 : svgPaths.p3ea74670} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p18b9eca0 : svgPaths.p3affbb00} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p1dfac600 : svgPaths.p21ef200} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p7a3d8f2 : svgPaths.p42b2650} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p3ee2c900 : svgPaths.p261f0380} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p37688980 : svgPaths.p2eca6600} fill="var(--fill-0, #263154)" />
              </g>
              <g id="A M">
                <path d={isMobileA1M ? svgPaths.p29d99100 : svgPaths.p10761f00} fill="var(--fill-0, white)" />
                <path d={isMobileA1M ? svgPaths.p2a3d6080 : svgPaths.p205881f0} fill="var(--fill-0, white)" />
              </g>
              <path clipRule="evenodd" d={isMobileA1M ? svgPaths.p16ba19c0 : svgPaths.p28b6ee00} fill="var(--fill-0, white)" fillRule="evenodd" id="Path 2" />
            </g>
          </svg>
        </div>
      )}
      {isAptia && (
        <div className="h-[84px] relative shrink-0 w-[82px]" data-name="download 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDownload1} />
        </div>
      )}
    </div>
  );
}

function Logo1({ className }: { className?: string }) {
  return (
    <div className={className || "h-[64px] overflow-clip relative w-[240px]"} data-name="Logo">
      <div className="absolute inset-[9.38%_24.58%_9.38%_-1.67%]" data-name="Keenan-Logo 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgKeenanLogo1} />
      </div>
      <div className="absolute inset-[34.38%_20.83%_53.13%_75.42%] overflow-clip" data-name="Asset 2 1">
        <div className="absolute contents inset-[1.92%_5.02%_5.19%_5.08%]" data-name="Layer 2">
          <div className="absolute inset-[1.92%_5.02%_5.19%_5.08%]" data-name="Layer 1">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.09024 7.43104">
              <g id="Layer 1">
                <path d={svgPaths.p2b0ed700} fill="url(#paint0_linear_10_3807)" id="Vector" />
                <path d={svgPaths.p3425f6f0} fill="url(#paint1_linear_10_3807)" id="Vector_2" />
              </g>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10_3807" x1="4.04512" x2="4.04512" y1="0" y2="7.43104">
                  <stop stopColor="#5B2540" />
                  <stop offset="0.0001" stopColor="#5B2540" />
                  <stop offset="1" stopColor="#5B2540" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10_3807" x1="4.24569" x2="4.24569" y1="1.69388" y2="5.72259">
                  <stop stopColor="#5B2540" />
                  <stop offset="0.0001" stopColor="#5B2540" />
                  <stop offset="1" stopColor="#5B2540" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
type ArrowMainProps = {
  className?: string;
  property1?: "Default" | "Right" | "Up" | "left";
};

function ArrowMain({ className, property1 = "Default" }: ArrowMainProps) {
  const isUp = property1 === "Up";
  return (
    <div className={className || "relative size-[24px]"}>
      {["Right", "Up", "left"].includes(property1) && (
        <div className={`absolute flex items-center justify-center ${isUp ? "bottom-[37.48%] left-1/4 right-[25.61%] top-[33.33%]" : "inset-[23.23%_35.71%_27.38%_35.1%]"}`} style={{ containerType: "size" }}>
          <div className={`flex-none ${property1 === "left" ? "h-[100cqw] rotate-90 w-[100cqh]" : isUp ? "h-[100cqh] rotate-180 w-[100cqw]" : "-rotate-90 h-[100cqw] w-[100cqh]"}`}>
            <div className="relative size-full" data-name="Fill 1">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8529 7.00438">
                <path clipRule="evenodd" d={svgPaths.p2be5a800} fill="var(--fill-0, #818285)" fillRule="evenodd" id="Fill 1" />
              </svg>
            </div>
          </div>
        </div>
      )}
      {property1 === "Default" && (
        <div className="absolute bottom-[37.48%] left-1/4 right-[25.61%] top-[33.33%]" data-name="Fill 1">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8529 7.00438">
            <path clipRule="evenodd" d={svgPaths.p2be5a800} fill="var(--fill-0, #818285)" fillRule="evenodd" id="Fill 1" />
          </svg>
        </div>
      )}
    </div>
  );
}
type GlobalHeaderProps = {
  className?: string;
  responsive?: "Mobile" | "Desktop";
  secured?: "Secured" | "Unsecured";
};

export default function GlobalHeader({ className, responsive = "Desktop", secured = "Secured" }: GlobalHeaderProps) {
  const isSecuredAndDesktop = secured === "Secured" && responsive === "Desktop";
  const isSecuredAndMobile = secured === "Secured" && responsive === "Mobile";
  const isUnsecuredAndDesktop = secured === "Unsecured" && responsive === "Desktop";
  const isUnsecuredAndMobile = secured === "Unsecured" && responsive === "Mobile";
  return (
    <div className={className || `relative ${responsive === "Mobile" ? "bg-white h-[64px] w-[375px]" : "h-[110px] w-[1440px]"}`}>
      {isSecuredAndDesktop && (
        <>
          <div className="absolute inset-[72.73%_0.28%_27.27%_0]" data-name="Header">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1437 1">
                <g id="Header">
                  <path d="M0.5 0.5H1436.5" id="Line 2" stroke="var(--stroke-0, #E2E2E2)" strokeLinecap="square" />
                </g>
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] left-[26.81%] right-[62.99%] text-[#333] text-[18px] top-[calc(50%-27px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            MEMBER PORTAL
          </p>
        </>
      )}
      {secured === "Secured" && (
        <div className={`absolute ${isSecuredAndMobile ? "bg-[#82479d] inset-[0_82.93%_0_0]" : "contents left-[1224px] top-[20px]"}`}>
          {isSecuredAndDesktop && (
            <>
              <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[24.55%_7.78%_59.09%_87.78%] leading-[normal] text-[#333] text-[13px] text-right" style={{ fontVariationSettings: '"wdth" 100' }}>
                Hi, Dennis
              </p>
              <ArrowMain className="absolute left-[1336px] size-[24px] top-[24px]" />
              <div className="absolute contents inset-[18.18%_12.78%_51.98%_85%]" data-name="Identity">
                <div className="absolute contents inset-[16.32%_12.64%_50.12%_84.86%]" data-name="circle image small">
                  <div className="absolute bg-[#e87823] inset-[16.32%_12.64%_50.12%_84.86%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[2px_2.052px] mask-size-[32px_32.821px] rounded-[100px]" style={{ maskImage: `url("${imgBkgd}")` }} data-name="bkgd" />
                  <div className="absolute inset-[25.64%_13.33%_59.44%_85.56%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-8px_-8.205px] mask-size-[32px_32.821px]" style={{ maskImage: `url("${imgBkgd}")` }} data-name="avatar">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.4107">
                      <g id="avatar">
                        <path clipRule="evenodd" d={svgPaths.p2f6205e8} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 1" />
                        <path clipRule="evenodd" d={svgPaths.p283c2600} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 3" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {isSecuredAndDesktop && <Logo1 className="absolute h-[64px] left-[144px] overflow-clip top-[8px] w-[240px]" />}
      {responsive === "Desktop" && (
        <div className={`absolute h-[110px] top-0 w-[1440px] ${isUnsecuredAndDesktop ? "right-0" : "left-0"}`} data-name="Global Header">
          {isSecuredAndDesktop && (
            <div className="absolute h-[110px] left-0 top-0 w-[1440px]" data-name="Global Header">
              <div className="absolute contents left-0 top-0" data-name="Mask Group">
                <div className="absolute bg-white h-[110px] left-0 top-0 w-[1440px]" />
              </div>
              <div className="absolute contents left-0 top-0" data-name="Mask Group">
                <div className="absolute bg-white h-[110px] left-0 top-0 w-[1440px]" />
              </div>
              <div className="absolute content-stretch flex gap-[24px] items-center left-[990px] top-[29px]">
                <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                    <div className="relative shrink-0 size-[32px]" data-name="icon">
                      <div className="absolute contents inset-0" data-name="Identity">
                        <div className="absolute bg-[#df126c] inset-0 rounded-[100px]" data-name="Mask" />
                        <div className="absolute contents inset-[-6.25%]" data-name="circle image small">
                          <div className="absolute bg-[#df126c] inset-[-6.25%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[2px_2px] mask-size-[32px_32px] rounded-[100px]" style={{ maskImage: `url("${imgBkgd1}")` }} data-name="bkgd" />
                          <div className="absolute inset-1/4 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-8px_-8px] mask-size-[32px_32px]" style={{ maskImage: `url("${imgBkgd1}")` }} data-name="avatar">
                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.0012">
                              <g id="avatar">
                                <path clipRule="evenodd" d={svgPaths.p211de5d0} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 1" />
                                <path clipRule="evenodd" d={svgPaths.paf15100} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 3" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-col font-['Open_Sans:Regular',sans-serif] font-normal items-start leading-[normal] relative shrink-0 whitespace-nowrap">
                      <p className="relative shrink-0 text-[#333] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
                        Hi, Jennifer
                      </p>
                      <p className="relative shrink-0 text-[#666] text-[12px]" style={{ fontVariationSettings: '"wdth" 100' }}>
                        Employer
                      </p>
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[16px]" data-name="icon">
                    <div className="absolute inset-[31.25%_13.42%_26.07%_12.5%]" data-name="Fill 1">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8529 6.82927">
                        <path clipRule="evenodd" d={svgPaths.p222fb280} fill="var(--fill-0, #999999)" fillRule="evenodd" id="Fill 1" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex h-[51px] items-center justify-center relative shrink-0 w-0">
                  <div className="flex-none rotate-90">
                    <div className="h-0 relative w-[51px]">
                      <div className="absolute inset-[-1px_0_0_0]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 1">
                          <line id="Line 37" stroke="var(--stroke-0, #999999)" x2="51" y1="0.5" y2="0.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-end relative shrink-0">
                  <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[105.87450408935547%] relative shrink-0 text-[#666] text-[18px] tracking-[1.5px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                    ADMIN CENTER
                  </p>
                  <div className="content-stretch flex items-start px-[10px] py-[4px] relative rounded-[6px] shrink-0">
                    <div aria-hidden className="absolute border border-[#666] border-solid inset-0 pointer-events-none rounded-[6px]" />
                    <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#666] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                      For Employers
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-[21.82%_72.99%_20%_10.35%] overflow-clip" data-name="Logo">
                <div className="absolute inset-[9.38%_24.58%_9.38%_-1.67%]" data-name="Keenan-Logo 1">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgKeenanLogo1} />
                </div>
              </div>
              <div className="absolute h-[110px] left-0 top-0 w-[1440px]" data-name="Header 2">
                <div className="absolute contents left-0 top-0" data-name="Mask Group">
                  <div className="absolute bg-white h-[110px] left-0 top-0 w-[1440px]" />
                </div>
              </div>
            </div>
          )}
          {isUnsecuredAndDesktop && (
            <>
              <div className="absolute contents left-0 top-0" data-name="Mask Group">
                <div className="absolute bg-white h-[110px] left-0 top-0 w-[1440px]" />
              </div>
              <div className="absolute contents left-0 top-0" data-name="Mask Group">
                <div className="absolute bg-white h-[110px] left-0 top-0 w-[1440px]" />
              </div>
              <Logo className="absolute content-stretch flex flex-col h-[86px] items-start justify-center left-[112px] top-[12px]" />
              <div className="[word-break:break-word] absolute content-stretch flex flex-col items-end leading-[normal] right-[112px] text-right top-[33px] whitespace-nowrap">
                <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#82479d] text-[18px]" style={{ fontVariationSettings: '"wdth" 100' }}>
                  A1M Health Insurance TPA
                </p>
                <p className="font-['Open_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
                  Member Portal
                </p>
              </div>
            </>
          )}
        </div>
      )}
      {isSecuredAndDesktop && (
        <div className="-translate-y-1/2 absolute content-stretch flex gap-[8px] items-center justify-end right-[87px] top-[calc(50%+0.5px)]">
          <div className="[word-break:break-word] content-stretch flex flex-col items-end justify-center leading-[normal] relative shrink-0 text-right whitespace-nowrap">
            <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#82479d] text-[18px]" style={{ fontVariationSettings: '"wdth" 100' }}>
              A1M Health Insurance TPA
            </p>
            <p className="font-['Open_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
              Member Portal
            </p>
          </div>
          <div className="flex h-[51px] items-center justify-center relative shrink-0 w-0">
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[51px]">
                <div className="absolute inset-[-1px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 1">
                    <line id="Line 37" stroke="var(--stroke-0, #999999)" x2="51" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center relative shrink-0">
            <div className="bg-[rgba(10,117,147,0.2)] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[32px]">
              <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[32px]" data-name="icon 32x32">
                <div className="h-[15px] relative shrink-0 w-[10px]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 15">
                    <path d={svgPaths.p209d5200} fill="var(--fill-0, #0A7593)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center relative shrink-0">
            <div className="bg-[rgba(10,117,147,0.2)] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[32px]">
              <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[32px]" data-name="icon 32x32">
                <div className="h-[18px] relative shrink-0 w-[14px]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 18">
                    <g id="Vector">
                      <path d={svgPaths.p3f8ec680} fill="var(--fill-0, #0A7593)" />
                      <path d={svgPaths.p1d1a0700} fill="var(--fill-0, #0A7593)" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center relative shrink-0">
            <div className="bg-[#df126c] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[32px]">
              <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-right text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                SJ
              </p>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
            <div className="h-[3px] relative shrink-0 w-[6px]">
              <div className="absolute inset-[-11.79%_-5.89%_-23.57%_-5.89%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.70711 4.06066">
                  <g id="Vector 8">
                    <path d={svgPaths.p1fd2af40} stroke="var(--stroke-0, #6B6F7A)" />
                    <path d={svgPaths.p1fd2af40} stroke="var(--stroke-1, black)" strokeOpacity="0.2" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
      {(isSecuredAndDesktop || isUnsecuredAndMobile) && <Logo className={`absolute content-stretch flex flex-col items-start justify-center ${isUnsecuredAndMobile ? "inset-[12.5%_47.73%_12.5%_4.27%]" : "h-[86px] left-[146px] top-[12px]"}`} logo={isUnsecuredAndMobile ? "mobile A1M" : undefined} />}
      {isSecuredAndMobile && (
        <>
          <div className="absolute content-stretch flex inset-[18.75%_86.13%_18.75%_3.2%] items-center justify-center px-[4px] py-[3px]" data-name="icon 40x40">
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
              <div className="bg-white col-1 h-[4px] ml-0 mt-0 relative row-1 w-[30px]" data-name="Rectangle" />
              <div className="bg-white col-1 h-[4px] ml-0 mt-[10px] relative row-1 w-[30px]" data-name="Rectangle Copy 8" />
              <div className="bg-white col-1 h-[4px] ml-0 mt-[20px] relative row-1 w-[30px]" data-name="Rectangle Copy 9" />
            </div>
          </div>
          <Logo className="absolute content-stretch flex flex-col inset-[12.5%_30.67%_12.5%_21.33%] items-start justify-center" logo="mobile A1M" />
        </>
      )}
    </div>
  );
}