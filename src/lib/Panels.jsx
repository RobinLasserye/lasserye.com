import {useState, useEffect, Suspense} from "react";
import gsap from 'gsap'
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { ScrollToPlugin } from "gsap/ScrollToPlugin"

// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// Animation des compétences techniques & autes
const technicAnimation = (id, decalage, easeChoice) => {
    try {
        gsap.fromTo(id, 
            {
                scale: 0, 
                opacity: 0
            },
            {
                duration: 2,
                scale: 1, 
                x: 0 + decalage, 
                opacity: 1, 
                delay: 0.5, 
                stagger: 0.2,
                ease: easeChoice || "elastic", 
                force3D: true
            })
        } catch {
            return null
        }
    
}

// Animation transverses
const transverseAnimation = (id, sens, decalage, easeChoice) => {
    
    gsap.fromTo(id, 
        {
            x: sens * 150, 
            opacity: 0
        },
        {
            duration: 2,
            x: 0 + decalage, 
            opacity: 1, 
            delay: 0.5, 
            stagger: 0.2,
            ease: easeChoice || "elastic", 
            force3D: true
        })
}

const rotate3DAnimation = (id, decalage, easeChoice) => {
    gsap.fromTo(id, 
        {
            transform: "rotate3D(1, 0, 0, 1.57rad)",
            opacity: 0
        },
        {
            duration: 2,
            transform: null,
            opacity: 1, 
            delay: 0.5, 
            stagger: 0.2,
            ease: easeChoice || "elastic", 
            force3D: true
        })
}

// API local des compétences sous la forme [icon, texte]
const skillData = {
    "technique" : [
        ["/three.svg", "Three JS"],
        ["/integration.svg", "Intégration 3D"],
        ["/simulation.svg", "Simulation physique Web"],
        ["/react.svg", "React JS"],
        ["/user.svg", "UI / UX"],
        ["/js.svg", "HTML / Javascript / CSS"],
        ["/git.svg", "Méthodologie Git"],
        ["/py.svg", "Python"],
        
    ],
    "transverse": [
        ["/gestion.svg", "Gestion de projet"],
        ["/quality.svg", "Qualitative assurance"],
        ["/deal.svg", "Sens du relationnel"],
        ["/client.svg", "Prospection"],
        ["/brain.svg", "Analyse des besoins"],
    ]
}

const projectData = [
    ["/site_vitrine.jpg", "Développement de site vitrine 3D animé", "Conception A-Z du site vitrine lasserye.com comprenant intégration 3D, génération de modèles sous Blender avec texturing. Conception d'animation sous GSAP, mise en page responsive et gestion de projet sous git.",
    [0, 1, 3, 4, 5, 6],
    [0, 3]
    ],
    ["/siclem.jpg", "Développement Web Front-End pour Siclem", "Missions de développement front-end diverses en tant que membre du groupe Siclem.",
    [0, 1, 3, 4, 5, 6],
    [0, 1, 2, 3]
    ],
    ["/ikos.jpg", "Conception d'un simulateur de traffic ferroviaire", "Conception et développement sous Python d'un simulateur de traffic ferroviaire dans le cadre de validation haut-niveau pour l'agence Ikos Consulting.",
    [6, 7],
    [1, 2, 3]
    ],
    ["/instant_web.png", " E-Commerce", "Mise en place d'un environnement de développement web E-commerce alliant Sylius et React JS sous Gatsby, avec automatisation du déploiement web.",
    [3, 4, 5, 6],
    [0, 1, 2, 4]
    ],
]

function Project (props) {
    const {titre, children, image, keyforanim, id, isMobile, technicSkills, transverseSkills} = props

    useEffect(() => {
        if (keyforanim % 2 == 0) {
            transverseAnimation("." + id, -1)
        } else {
            transverseAnimation("." + id, 1)
        }
    }, [])
    

    return(
        <div className={id} style={{padding: "10 2 5 2", margin: 10, borderRadius: 8, background: "lightgrey", opacity: 0}}>
            <h2 style={{color: "#555555", textAlign: "center", fontSize: "2.2vw", lineHeight: "2.5vw"}}>{titre}</h2>

            <div style={{display: "grid", gridTemplateColumns: "50% 50%", padding: "10 5 10 5", margin: 10, borderRadius: 8, background: "lightgrey"}}>
            
                <div>
                    <p style={{color: "black", fontSize: isMobile ? "40%" : "1.2vw", lineHeight: isMobile ? "110%" :  "1.6vw", textAlign: "justify", background: "whitesmoke", borderRadius: 8, padding: "5%"}}>{children}</p>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "50% 50%", background: "whitesmoke", borderRadius: 8, paddingRight: "5%", paddingBottom: "5%"}}>
                        <div style={{ display: "flex", flexDirection: "column",height: "100%"}}>
                            {technicSkills.map((item, key) => {
                                return(<div key={key} style={{display: "flex", flexDirection: "row",margin: "5% 0 0 0", padding: 0, zIndex: 25, width: "90%", marginLeft: "10%"}}>
                                    <img src={skillData["technique"][item][0]} style={{width: "25%", textJustify: "center"}}/>
                                    <p style={{fontSize: isMobile ? "40%" : "1.2vw", lineHeight: isMobile ? "110%" :  "1.6vw", color: "black", marginLeft: "10%"}} >{skillData["technique"][item][1]}</p>
                                </div>)
                                
                            })}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column",height: "100%"}}>
                        {transverseSkills.map((item, key) => {
                                return (<div key={key} style={{display: "flex", flexDirection: "row",margin: "5% 0 0 0", padding: 0, zIndex: 25, width: "90%", marginLeft: "10%"}}>
                                    <img src={skillData["transverse"][item][0]} style={{width: "25%", textJustify: "center"}}/>
                                    <p style={{fontSize: isMobile ? "40%" : "1.2vw", lineHeight: isMobile ? "110%" :  "1.6vw", color: "black", marginLeft: "10%"}} >{skillData["transverse"][item][1]}</p>
                                </div>)
                                })}
                            </div>
                    </div>
                </div>

                <div style={{marginLeft: "10%", marginTop: "5%"}}>
                    <img style={{width: "90%", borderRadius: 10}} src={image}/>
                </div>
            
        </div>
    </div>
   
    )
}

function TextPanel (props) {
    const {titre, children, id} = props

    return(<div className={id} style={{padding: 20, marginTop: 10, paddingTop: 5, margin: "2 4 2 5", borderRadius: 8, background: "grey"}}>
        {titre && <h2 style={{color: "black", textJustify: "center"}}>{titre}</h2>}
        <div style={{color: "black", textAlign: "justify"}}>{children}</div>
    </div>
    )
}

// Fonction de mise en forme des compétences
function Skill (props) {
    const {img, children, id, isMobile} = props

    return(<div
    className={id} style={{display: "flex", flexDirection: "row",margin: isMobile ? 0 :"1vw 0 0 0", padding: 0, zIndex: 25, width: isMobile ? "90%" : "120%"}}>
        <img src={img} style={{width: "40px", textJustify: "center"}}/>
        <p style={{color: "black", fontSize: isMobile ? 10 : 14, textAlign: "center", textJustify: "center", marginLeft: "10%", lineHeight: 1}}>{children}</p>
    </div>)
}

export default function Panels(props) {
    // Props et variables de gestions
    const { param, isMobile } = props
    const [stopDisplayCopying, setStopDisplayCopying] = useState(true)
    const [skillOverflow, setSkillOverflow] = useState(false)
    let i = 2


    // Fonction de copy clipboard email
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

    // Les panneaux générés
    switch (param) {


        // Onglet Compétence
        case 1:
            useEffect(() => {
                // Animation panel compétences
                // Animation compétences techniques
                technicAnimation(".technique", isMobile ? 10 : "20%")
                // Animation compétences Transverses 
                transverseAnimation(".transverse", 1, isMobile ? 10 :"20%")   

                // Gestion de l'activation de l'overflow
                const activateOverflow = setTimeout(() => {
                    setSkillOverflow(true)
                    return(
                        clearTimeout(activateOverflow)
                    )
                }, 
                window.innerHeight * 3)
            }, [])

            return (
                <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", alignItems: "center"}}>
                    <h1 style={{ color: "black", margin: "1vwz 0 0 0", fontSize: "min(8vw, 36px)" }}>Compétences</h1>
                    <div style={{ display: "grid", gridTemplateColumns: "50% 50%", gridAutoRows: "minmax(8vh, auto)",
                    overflowY: skillOverflow && "scroll", width: isMobile ? "95%" : "80%"
                    }}>
                        <h2 style={{gridColum: 1, gridRow: 1, margin: isMobile ? "10 0 10 0" : "min(5vw, 5vh)",textAlign: "center", color: "darkgrey", fontSize: isMobile ? 20 : 30}}>
                            Techniques
                            </h2>
                        <h2 style={{gridColum: 1, gridRow: 1, margin: isMobile ? "10 0 10 0" : "min(5vw, 5vh)",textAlign: "center", color: "darkgrey", fontSize: isMobile ? 20 : 30}}>
                            Transverses
                            </h2>
                        <div style={{ display: "flex", flexDirection: "column",height: "100%"}}>
                            {skillData["technique"].map((item, key) => <Skill key={key} isMobile={isMobile} id={"technique"} img={item[0]}>{item[1]}</Skill>)}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column",height: "100%"}}>
                            {skillData["transverse"].map((item, key) => <Skill key={key} isMobile={isMobile} id={"transverse"} img={item[0]}>{item[1]}</Skill>)}
                        </div>
                    
                    </div>
                
                </div>
            );


        // Onglet à Propos 
        case 2:
            useEffect(() => {
                // Animation panel à propos
                // Animation premier panneau gauche
                transverseAnimation(".presentation", -1, 0)
                // Animation image
                technicAnimation(".img_robin", "50%")
                // Animation seconde section
                transverseAnimation(".front", -1, 0, "power4")
                transverseAnimation(".comp_and_lang", 1, 0, "power4")
                // Animation deux dernières sections
                technicAnimation(".text_propos")
                technicAnimation(".text_propos")
            }, [])

            return (
                <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", alignItems: "center", overflowY: "scroll", background: "darkgrey" }}>
                    <h1 style={{ color: "black", marginTop: "1vw" }}>A propos</h1>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "100%" : "40% 60%", width: "95%"
                    }}>
                        <TextPanel id={"presentation"}>
                            <p style={{textAlign: "center", marginTop: "10%", color: "#333333", }}>Je m’appelle Robin Lasserye, diplômé en tant qu’ingénieur en informatique, microélectronique et automatique, je suis aujourd’hui Développeur Web Freelance orienté Front-End.</p>
                        </TextPanel>
                        <img className={"img_robin"} style={{ borderRadius: "50%", width: "50%", marginRight: "5%", marginTop: isMobile ? "10%" : "0%",}} src={"/robin-3.jpg"}/>
                        
                    </div>
                    
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "100%" : "40% 60%", gridAutoRows: "minmax(8vh, auto)", gap: 10, width: "95%", marginTop: 10
                    }}>
                        <TextPanel titre={"Pourquoi le Front-End ?"} id="front">
                            Photographe et passionné par l’art numérique, j’ai une réelle prédisposition pour créer des sites pour mes clients avec une signature graphique unique. A l’heure où de nombreux sites sont générés selon des templates, collaborer avec mes clients sur des projets innovants et stimulants est pour moi une belle source d’enrichissement.
                        </TextPanel>
                        <TextPanel titre={"Mes compétences et mes langages"} id={"comp_and_lang"}>
                            J’ai cœur à faire évoluer mes compétences vers un modèle me permettant la plus grande polyvalence possible afin de concevoir l’interface la plus sur-mesure possible pour mes clients.
                            Ainsi je me suis orienté vers React.js notamment pour l’utilisation très agile de ces hooks, couplé à d’autres dépendances très utiles pour la réalisation Front-End que sont Boostrap, TailWind, le CSS avec une préférence pour Material-UI.
                            <br/>
                            <br/>
                            
                            L’épicentre de ma passion vers lequel convergent mes compétences se situe dans la conception d’interface 3D web.
                            Pour cela, j’utilise essentiellement Three.js couplé à Blender pour générer mes propres modèles 3D sans dépendre de bibliothèques externes.
                        </TextPanel>
                    </div>
                    <div style={{width: "95%"}}>
                        <TextPanel titre={"Pourquoi la 3D ?"} id={"text_propos"}>
                            Aujourd’hui la technologie permet d’obtenir bien plus aisément un site web avec une boutique, un blog ou bien un site vitrine rapidement et à moindre coût. Néanmoins, pour cela, le site devra d’abord suivre un template, un pattern avant de subir des modifications pour lui donner une réelle identité graphique.
                            <br/>
                            <br/>
                            Créer cette identité est pour moi particulièrement important et la 3D se situe bien au-delà de la simple personnalisation. Il est bien rare qu’un template permet de générer des interfaces 3D dans un site web, alors que celle-ci exalte l’œil du visiteur.
                            Interactive, unique et tout public, la 3D permet de différencier aisément un site haut de gamme d’un autre moins développé. Dans un monde qui se numérise, avec l’avènement du jeu vidéo, de la 3D cinématographique et avec les avancées de la Réalité Virtuelle, prenez une avance considérable pour ce qui est de la visibilité de votre site web. L’ajout de 3D dans la présentation de vos produits ou de vos services peut parfois suffire à faire monter en gamme.
                            <br/>
                            <br/>
                            Votre public est jeune ? Adressez-vous à eux avec une interface qu’ils connaissent sans pour autant qu’ils aient pu l’expérimenter auparavant sur un site web.
                            Votre public est plus âgé ? Concevez une interface simplicité et modernité pour attirer leur œil sur ce qui vous intéresse vraiment.
                            Votre site généra alors confiance et intérêt quel que soit le profil du visiteur. Celui-ci n’est pas intéressé ? Il montrera votre site non pas pour vos produits, mais pour votre design, design portant le nouveau regard sur vos produits, la boucle est bouclée. Vous venez de générer une nouvelle conversion.
                        </TextPanel>
                    </div>
                    <div style={{width: "95%"}} >
                        <TextPanel titre={"Une modélisation sur-mesure "} id={"text_propos"}>
                                En fonction de son interactivité, de sa demande de performance ou du niveau de détail demandé, tout est possible quand les modèles sont réalisés sur mesures.
                                Du rendu complet et réaliste d’un produit que vous souhaitez mettre en valeur à l’animation plurielle pour faciliter l’interactivité de votre site, tout est possible.
                        </TextPanel>
                    </div>  
                        
                    
                </div>
            );

        // Onglet Contact
        case 3:
            useEffect(() => {
                //Animation des contacts
                rotate3DAnimation(".contact")
            }, [])

            const timer = setTimeout(() => {
                const panelDiv = document.getElementsByClassName("radiodiv")
                panelDiv[0].style.background = "rgb(100, 100, 100)"
                return (clearTimeout(timer))
            }, 1)

            return (
                <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "80%", alignItems: "center" }}>

                    <h1 style={{ color: "whitesmoke", margin: "1vw" }}>Contact</h1>

                    <div className="contact">
                        <button onClick={() => { window.open("https://www.malt.fr/profile/robinlasserye") }}
                            style={{ background: "transparent", padding: 0 }}>
                            <img src={"/malt.svg"} style={{ width: "20vh" }} />
                        </button>
                    </div>
                    <div className="contact">
                        <button onClick={() => { window.open("https://www.linkedin.com/in/robin-lasserye-8672b1200/") }}
                            style={{ background: "transparent", padding: 0 }}>
                            <img src={"/linkedin.svg"} style={{ width: "20vh" }} />
                        </button>
                    </div>
                    <div className="contact">
                        <button style={{ background: "transparent", padding: 0 }}
                            onClick={(e) => { CopyClip(e) }}>
                            <img src={"/mail.svg"} style={{ width: "20vh" }} />
                        </button>
                        <p style={{
                            background: "lightgreen", margin: 5, padding: 3, borderRadius: 10,
                            transition: 'all 0.3s', opacity: stopDisplayCopying ? 0 : 1, zIndex: 20, 
                            transform: "translateX(110%) translateY(-15vh)" 
                        }}> Email copié !</p>
                        

                    </div>
                    
                </div>
            );

        // Onglet Projet
        case 4 :
            return (
                <Suspense fallback={<h1 style={{color: "whitesmoke"}}>Chargement</h1>}>
                <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", alignItems: "center", background: "grey" }}>
                    <h1 style={{ color: "black", margin: "1vw" }}>Projets</h1>
                    <hr style={{width: "90%"}}/>
                    <div style={{ display: "grid", gridTemplateColumns: "100%", width: "95%", overflowY: "scroll"
                    }}> 
                    {projectData.map((item, key) => {
                        return <Project key={key} isMobile={isMobile} keyforanim={key} id={"projet"} 
                        image={item[0]} 
                        titre={item[1]}
                        technicSkills={item[3]}
                        transverseSkills={item[4]}
                        >{item[2]}</Project>
                    })}
                    </div>
                
                </div>
                </Suspense>
                
            );
        default:
            return null;
    }
}