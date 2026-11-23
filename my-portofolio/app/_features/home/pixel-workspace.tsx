export default function PixelWorkspace() {
  return (
    <svg className="pixel-workspace" viewBox="0 0 320 224" fill="none" shapeRendering="crispEdges" role="img" aria-labelledby="workspace-title workspace-description">
      <title id="workspace-title">A programmer’s little corner of the universe</title>
      <desc id="workspace-description">An animated pixel-art programmer typing in a cozy room. The window shows sunshine in light mode, and a moon and twinkling stars in dark mode.</desc>
      <rect width="320" height="224" fill="var(--pixel-wall)"/>
      <path d="M0 0H320V8H0ZM0 0H12V184H0ZM308 0H320V184H308Z" fill="var(--pixel-beam)"/>
      <rect x="19" y="23" width="175" height="113" fill="var(--pixel-frame)"/>
      <rect x="25" y="29" width="163" height="100" fill="var(--pixel-sky)"/>
      <g className="pixel-sun" fill="#f5bf57">
        <path d="M75 41H93V45H97V63H93V67H75V63H71V45H75Z"/>
        <path d="M82 32H86V37H82ZM82 71H86V76H82ZM62 52H67V56H62ZM101 52H106V56H101ZM66 36H70V40H66ZM98 36H102V40H98ZM66 68H70V72H66ZM98 68H102V72H98Z"/>
        <path d="M78 44H89V48H93V59H89V63H78V59H75V48H78Z" fill="#ffda81"/>
      </g>
      <g className="pixel-moon">
        <path d="M80 38H94V42H98V60H94V64H80V60H76V42H80Z" fill="#e7ecce"/>
        <path d="M90 36H99V41H103V59H95V55H91V47H87V40H90Z" fill="var(--pixel-sky)"/>
        <rect x="80" y="47" width="4" height="4" fill="#b4c6c4"/>
      </g>
      <g className="pixel-stars" fill="#dbe9e4">
        {[ [37,40], [57,63], [119,38], [151,48], [173,35], [135,74], [41,86], [165,82] ].map(([x,y],i)=><g className={`pixel-star pixel-star-${i%3}`} key={x}><rect x={x} y={y} width="2" height="2"/>{i%3===0&&<><rect x={x-2} y={y+1} width="6" height="1"/><rect x={x+1} y={y-2} width="1" height="6"/></>}</g>)}
      </g>
      <g className="pixel-cloud" fill="var(--pixel-cloud)"><path d="M33 76H39V72H53V76H62V80H33Z"/><path d="M128 60H135V55H151V60H162V64H128Z"/></g>
      <path d="M25 106H38V100H49V92H59V98H70V105H82V96H96V86H108V95H121V103H137V96H150V101H165V91H177V101H188V129H25Z" fill="var(--pixel-mountains)"/>
      <path d="M25 117H39V112H53V119H70V110H84V104H96V112H113V118H133V109H148V115H169V106H181V116H188V129H25Z" fill="var(--pixel-hills)"/>
      <path d="M37 129V115H33V111H37V104H41V111H45V115H41V129ZM151 129V120H147V116H151V109H155V116H159V120H155V129Z" fill="var(--pixel-trees)"/>
      <path d="M25 129H188V135H25ZM103 29H108V129H103ZM25 82H188V86H25Z" fill="var(--pixel-frame)"/>
      <rect x="14" y="135" width="185" height="6" fill="var(--pixel-wood-light)"/>
      <g fill="var(--pixel-wood)"><rect x="259" y="44" width="43" height="5"/><rect x="259" y="81" width="43" height="5"/></g>
      <g><rect x="264" y="23" width="6" height="21" fill="#9b6752"/><rect x="271" y="28" width="5" height="16" fill="#c49b67"/><rect x="277" y="21" width="8" height="23" fill="#587f81"/><rect x="287" y="26" width="6" height="18" fill="#8f9b79"/><path d="M266 33H268M279 28H283" stroke="#e9d5b2" strokeWidth="2"/><rect x="273" y="65" width="16" height="16" fill="#a16a4c"/><path d="M278 65V50H282V65M278 57H271V52H278M282 60H289V55H282" fill="#658b69"/></g>
      <path className="pixel-lamp-light" d="M269 122H287L307 166H237Z" fill="#e7af5640"/>
      <path d="M278 157V134H282V157M280 134V120H284V134M271 118H291V123H271M275 113H286V118H275" fill="var(--pixel-lamp)"/>
      <rect x="273" y="157" width="19" height="4" fill="var(--pixel-lamp)"/>
      <rect x="52" y="165" width="251" height="8" fill="var(--pixel-wood-light)"/>
      <rect x="55" y="173" width="246" height="6" fill="var(--pixel-wood)"/>
      <rect x="62" y="179" width="8" height="35" fill="var(--pixel-wood)"/>
      <rect x="285" y="179" width="8" height="35" fill="var(--pixel-wood)"/>
      <rect x="117" y="106" width="61" height="42" fill="#263b4b"/>
      <rect x="121" y="110" width="53" height="32" fill="#142a3b"/>
      <rect x="124" y="113" width="9" height="2" fill="#607e93"/>
      <g className="pixel-code">
        {Array.from({length:6},(_,i)=><g key={i}><rect x={127+i%2*4} y={119+i*3} width={9+i%3*5} height="1" fill={i%2?"#e6bb76":"#8dc6bb"}/><rect x={147+i%2*3} y={119+i*3} width={8+i%3*2} height="1" fill="#94a7d1"/></g>)}
      </g>
      <rect className="pixel-cursor" x="143" y="137" width="3" height="2" fill="#e2ce9b"/>
      <path d="M143 148H151V157H160V160H134V157H143Z" fill="#455a67"/>
      <rect x="182" y="115" width="34" height="31" fill="#263b4b"/><rect x="186" y="119" width="26" height="22" fill="#183348"/>
      <path d="M190 125H204M190 129H199M193 133H207" stroke="#83b8ae" strokeWidth="1"/>
      <rect x="195" y="146" width="5" height="12" fill="#455a67"/>
      <rect x="137" y="158" width="46" height="5" fill="#344956"/>
      <path d="M141 159H178M143 161H174" stroke="#89a1a9" strokeWidth="1"/>
      <rect x="90" y="151" width="12" height="14" fill="var(--pixel-mug)"/>
      <path d="M102 154H106V161H102" stroke="var(--pixel-mug)" strokeWidth="2"/>
      <path className="pixel-steam" d="M94 146V142H96V138M99 149V145H101V141" stroke="var(--pixel-steam)" strokeWidth="1"/>
      <rect x="54" y="152" width="16" height="13" fill="#a66f50"/>
      <rect x="52" y="150" width="20" height="4" fill="#bf8b63"/>
      <path d="M61 151V132H65V151M61 142H53V135H57V139H61M65 137H73V130H69V134H65M61 134H57V128H61Z" fill="var(--pixel-plant)"/>
      <path d="M209 142H241V178H207V153H201V147H209Z" fill="var(--pixel-shirt)"/>
      <path d="M216 142H224V148H216Z" fill="#cd9574"/>
      <g className="pixel-head">
        <path d="M214 111H239V138H214V131H209V121H214Z" fill="#dcaa82"/>
        <path d="M216 102H236V106H243V112H246V130H239V136H229V127H225V117H213V120H209V111H212V106H216Z" fill="#283448"/>
        <path d="M218 105H232V108H240V113H225V110H215Z" fill="#3b4657"/>
        <rect x="212" y="121" width="3" height="3" fill="#283448"/>
      </g>
      <path d="M210 145H218V155H204V159H186V153H199V148H210Z" fill="var(--pixel-shirt-light)"/>
      <g className="pixel-hand-left"><path d="M184 154H194V158H188V161H177V158H184Z" fill="#dcaa82"/><rect x="176" y="159" width="9" height="2" fill="#edbc94"/></g>
      <path d="M214 157H220V165H207V163H195V158Z" fill="var(--pixel-shirt-light)"/>
      <rect className="pixel-hand-right" x="187" y="158" width="12" height="4" fill="#dcaa82"/>
      <path d="M209 177H238V190H221V207H213V189H207V181Z" fill="#293c50"/>
      <path d="M229 180H242V199H238V213H230V196H226Z" fill="#34495c"/>
      <rect x="209" y="207" width="15" height="5" fill="#203040"/><rect x="226" y="213" width="15" height="5" fill="#203040"/>
      <path d="M240 149H257V185H250V193H218V185H240Z" fill="var(--pixel-chair)"/>
      <rect x="245" y="153" width="8" height="27" fill="var(--pixel-chair-light)"/>
      <path d="M233 193H238V211H250V215H221V211H233Z" fill="#4c5f6a"/>
      <rect x="217" y="214" width="7" height="4" fill="#253c49"/><rect x="248" y="214" width="7" height="4" fill="#253c49"/>
      <path d="M0 220H320V224H0Z" fill="var(--pixel-beam)"/>
    </svg>
  );
}
