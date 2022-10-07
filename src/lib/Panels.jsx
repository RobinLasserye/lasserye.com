import {useState, useEffect} from "react";
import gsap from 'gsap'

const skillData = {
    "technique" : [
        ["/three.svg", "Three JS"],
        ["/react.svg", "React JS"],
        ["/user.svg", "UI / UX"],
        ["/js.svg", "HTML / Javascript / CSS"],
        ["/git.svg", "Méthodologie Git"],
        ["/py.svg", "Python"],
        
    ],
    "transverse": [
        ["/gestion.svg", "Gestion de projet"],
        ["/quality.svg", "Qualitative assurance"],
        ["/gestion.svg", "Sens du relationnel"],
        ["/gestion.svg", "Prospection"],
    ]
}

function Skill (props) {
    const {img, children, id} = props

    return(<div
    className={id} style={{display: "grid", gridTemplateColumns: "50px 20vw", alignItems: "center", alignContent: "center", margin: "0 20px 0 0", padding: 0, zIndex: 25}}>
        <img src={img} style={{width: "40px", transform: "translateX(5vw)"}}/>
        <p style={{color: "black", fontSize: 14, textAlign: "center", marginLeft: "30px", lineHeight: 1}}>{children}</p>
    </div>)
}

export default function Panels(props) {
    const { param, isMobile } = props
    const [stopDisplayCopying, setStopDisplayCopying] = useState(true)
    const [skillOverflow, setSkillOverflow] = useState(false)
    let i = 2

    const technicAnimation = () => {gsap.fromTo(".technique", 
    {
        scale: 0, 
        opacity: 0
    },
    {
        duration: 2,
        scale: 1, 
        opacity: 1, 
        delay: 0.5, 
        stagger: 0.2,
        ease: "elastic", 
        force3D: true
    })}
    const transverseAnimation = () => {gsap.fromTo(".transverse", 
    {
        x: 150, 
        opacity: 0
    },
    {
        duration: 2,
        x: 0, 
        opacity: 1, 
        delay: 0.5, 
        stagger: 0.2,
        ease: "elastic", 
        force3D: true
    })}

    useEffect(() => {
        technicAnimation()
        transverseAnimation()

        const activateOverflow = setTimeout(() => {
            setSkillOverflow(true)
            return(
                clearTimeout(activateOverflow)
            )
        }, 
        window.innerHeight * 4)
        
    }, []);

    const CopyClip = (e) => {
        // Copy the email in the clipboard
        navigator.clipboard.writeText("robin.lasserye.pro@gmail.com");

        // Activate the copiying pop up
        setStopDisplayCopying(false)

        const timer = setTimeout(() => {
            setStopDisplayCopying(true)
            return (clearTimeout(timer))
        }, 1000)
    }

    switch (param) {
        case 1:
            return (
                <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", alignItems: "center" }}>
                    <h1 style={{ color: "black", margin: "1vw 0 0 0", fontSize: "min(8vw, 36px)" }}>Compétences</h1>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridAutoRows: "minmax(8vh, auto)",
                    overflowY: skillOverflow && "scroll", overflowX: "none", width: "80%"
                    }}>
                    <h2 style={{gridColum: 1, gridRow: 1, margin: "min(5vw, 5vh)",textAlign: "center", fontSize: "min(5vw, 6vh)", color: "darkgrey"}}>
                        Techniques
                        </h2>
                    <h2 style={{gridColum: 2, gridRow: 1, margin: "min(5vw, 5vh)", textAlign: "center", fontSize: "min(5vw, 6vh)", color: "darkgrey"}}>
                        Transverses
                        </h2>
                    <div>
                        {skillData["technique"].map((item, key) => <Skill key={key} id={"technique"} img={item[0]}>{item[1]}</Skill>)}
                    </div>
                    <div>
                        {skillData["transverse"].map((item, key) => <Skill key={key} id={"transverse"} img={item[0]}>{item[1]}</Skill>)}
                    </div>
                    
                    </div>
                
                </div>
            );
        case 2:
            return (
                <div>
                    <h1 style={{ color: "black", margin: "1vw" }}>Pourquoi la 3D ?</h1>
                </div>
            );
        case 3:
            const timer = setTimeout(() => {
                const panelDiv = document.getElementsByClassName("radiodiv")
                panelDiv[0].style.background = "rgb(100, 100, 100)"
                return (clearTimeout(timer))
            }, 1)

            return (
                <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "80%", alignItems: "center" }}>

                    <h1 style={{ color: "whitesmoke", margin: "1vw" }}>Contact</h1>

                    <div>
                        <button onClick={() => { window.open("https://www.malt.fr/profile/robinlasserye") }}
                            style={{ background: "transparent", padding: 0 }}>
                            <img src={"/malt.svg"} style={{ width: "20vh" }} />
                        </button>
                    </div>
                    <div>
                        <button onClick={() => { window.open("https://www.linkedin.com/in/robin-lasserye-8672b1200/") }}
                            style={{ background: "transparent", padding: 0 }}>
                            <img src={"/linkedin.svg"} style={{ width: "20vh" }} />
                        </button>
                    </div>
                    <div>
                        <button style={{ background: "transparent", padding: 0 }}
                            onClick={(e) => { CopyClip(e) }}>
                            <img src={"/mail.svg"} style={{ width: "20vh" }} />
                        </button>
                        <p style={{
                            background: "lightgreen", margin: 5, padding: 3, borderRadius: 10,
                            transition: 'all 0.3s', opacity: stopDisplayCopying ? 0 : 1, zIndex: 20, 
                            transform: "translateX(110%) translateY(-15vh)" 
                        }}> Email copié !</p>
                        {/* position: "absolute", display: "box", top: `${window.innerHeight/posY + 50}%`, left: `${window.innerWidth/posX + 50}%` , */}

                    </div>
                    ²
                </div>
            );
        default:
            return null;
    }
}