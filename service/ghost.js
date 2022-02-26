const {MessageEmbed} = require("discord.js");
const EVIDENCE_Y = "✅"
const EVIDENCE_N = "❌"
const EVIDENCE_RESET = "Reset"
const EVIDENCE_NONE = "None"
const EVIDENCE_EMF5 = "EMF5"
const EVIDENCE_ORB = "Orb"
const EVIDENCE_SPIRIT_BOX = "Spirit Box"
const EVIDENCE_FREEZING = "Freezing"
const EVIDENCE_FINGERPRINTS = "Fingerprints"
const EVIDENCE_WRITING = "Writing"
const EVIDENCE_DOTS = "D.O.T.S"

const GHOST_BANSHEE = "Banshee"
const GHOST_DEMON = "Demon"
const GHOST_GORYO = "Goryo"
const GHOST_HANTU = "Hantu"
const GHOST_JINN = "Jinn"
const GHOST_MARE = "Mare"
const GHOST_MYLING = "Myling"
const GHOST_OBAKE = "Obake"
const GHOST_ONI = "Oni"
const GHOST_ONRYO = "Onryo"
const GHOST_PHANTOM = "Phantom"
const GHOST_POLTERGEIST = "Poltergeist"
const GHOST_RAIJU = "Raiju"
const GHOST_REVENANT = "Revenant"
const GHOST_SHADE = "Shade"
const GHOST_SPIRIT = "Spirit"
const GHOST_THE_MIMIC = "The Mimic"
const GHOST_THE_TWINS = "The Twins"
const GHOST_WRAITH = "Wraith"
const GHOST_YOKAI = "Yokai"
const GHOST_YUREI = "Yurei"

const GHOST_DATABASE = [
  { name: GHOST_BANSHEE, evidences: [EVIDENCE_ORB, EVIDENCE_FINGERPRINTS, EVIDENCE_DOTS], link: "https://phasmophobia.fandom.com/wiki/Banshee" },
  { name: GHOST_DEMON, evidences: [EVIDENCE_FREEZING, EVIDENCE_FINGERPRINTS, EVIDENCE_WRITING], link: "https://phasmophobia.fandom.com/wiki/Demon" },
  { name: GHOST_GORYO, evidences: [EVIDENCE_EMF5, EVIDENCE_FINGERPRINTS, EVIDENCE_DOTS], link: "https://phasmophobia.fandom.com/wiki/Goryo" },
  { name: GHOST_HANTU, evidences: [EVIDENCE_ORB, EVIDENCE_FREEZING, EVIDENCE_FINGERPRINTS], link: "https://phasmophobia.fandom.com/wiki/Hantu" },
  { name: GHOST_JINN, evidences: [EVIDENCE_EMF5, EVIDENCE_FREEZING, EVIDENCE_FINGERPRINTS], link: "https://phasmophobia.fandom.com/wiki/Jinn" },
  { name: GHOST_MARE, evidences: [EVIDENCE_ORB, EVIDENCE_SPIRIT_BOX, EVIDENCE_WRITING], link: "https://phasmophobia.fandom.com/wiki/Mare" },
  { name: GHOST_MYLING, evidences: [EVIDENCE_EMF5, EVIDENCE_FINGERPRINTS, EVIDENCE_WRITING], link: "https://phasmophobia.fandom.com/wiki/Myling" },
  { name: GHOST_OBAKE, evidences: [EVIDENCE_EMF5, EVIDENCE_ORB, EVIDENCE_FINGERPRINTS], link: "https://phasmophobia.fandom.com/wiki/Obake" },
  { name: GHOST_ONI, evidences: [EVIDENCE_EMF5, EVIDENCE_FREEZING, EVIDENCE_DOTS], link: "https://phasmophobia.fandom.com/wiki/Oni" },
  { name: GHOST_ONRYO, evidences: [EVIDENCE_ORB, EVIDENCE_SPIRIT_BOX, EVIDENCE_FREEZING], link: "https://phasmophobia.fandom.com/wiki/Onryo" },
  { name: GHOST_PHANTOM, evidences: [EVIDENCE_SPIRIT_BOX, EVIDENCE_FINGERPRINTS, EVIDENCE_DOTS], link: "https://phasmophobia.fandom.com/wiki/Phantom" },
  { name: GHOST_POLTERGEIST, evidences: [EVIDENCE_SPIRIT_BOX, EVIDENCE_FINGERPRINTS, EVIDENCE_WRITING], link: "https://phasmophobia.fandom.com/wiki/Poltergeist" },
  { name: GHOST_RAIJU, evidences: [EVIDENCE_EMF5, EVIDENCE_ORB, EVIDENCE_DOTS], link: "https://phasmophobia.fandom.com/wiki/Raiju" },
  { name: GHOST_REVENANT, evidences: [EVIDENCE_ORB, EVIDENCE_FREEZING, EVIDENCE_WRITING], link: "https://phasmophobia.fandom.com/wiki/Revenant" },
  { name: GHOST_SHADE, evidences: [EVIDENCE_EMF5, EVIDENCE_FREEZING, EVIDENCE_WRITING], link: "https://phasmophobia.fandom.com/wiki/Shade" },
  { name: GHOST_SPIRIT, evidences: [EVIDENCE_EMF5, EVIDENCE_SPIRIT_BOX, EVIDENCE_WRITING], link: "https://phasmophobia.fandom.com/wiki/Spirit" },
  { name: GHOST_THE_MIMIC, evidences: [EVIDENCE_SPIRIT_BOX, EVIDENCE_FREEZING, EVIDENCE_FINGERPRINTS], link: "https://phasmophobia.fandom.com/wiki/The_Mimic" },
  { name: GHOST_THE_TWINS, evidences: [EVIDENCE_EMF5, EVIDENCE_SPIRIT_BOX, EVIDENCE_FREEZING], link: "https://phasmophobia.fandom.com/wiki/The_Twins" },
  { name: GHOST_WRAITH, evidences: [EVIDENCE_EMF5, EVIDENCE_SPIRIT_BOX, EVIDENCE_DOTS], link: "https://phasmophobia.fandom.com/wiki/Wraith" },
  { name: GHOST_YOKAI, evidences: [EVIDENCE_ORB, EVIDENCE_SPIRIT_BOX, EVIDENCE_DOTS], link: "https://phasmophobia.fandom.com/wiki/Yokai" },
  { name: GHOST_YUREI, evidences: [EVIDENCE_ORB, EVIDENCE_FREEZING, EVIDENCE_DOTS], link: "https://phasmophobia.fandom.com/wiki/Yurei" },
]


const guessGhostEmbed = evidenceText => {
  const evidences = getEvidences(evidenceText)
  const ghosts = guessGhost(evidences)

  const embed = new MessageEmbed()
    .setTitle("Ghost List")

  ghosts.forEach(({ name, evidences: ghostEvidences, link }) => {

    for (const [evidence, has] of evidences) {
      if (has) {
        ghostEvidences = ghostEvidences.filter(g => g !== evidence)
      }
    }

    embed.addField(name, ghostEvidences.length > 0 ? `${ghostEvidences.join(", ")}` : `[Info](${link})`, true)
  })

  return embed
}

const guessGhost = evidences => {
  let ghosts = GHOST_DATABASE
  const yList = []
  const nList = []

  for (const [evidence, has] of evidences) {
    if (has) {
      yList.push(evidence)
    } else {
      nList.push(evidence)
    }
  }

  for (const evidence of yList) {
    ghosts = ghosts.filter(g => g.evidences.includes(evidence))
  }
  for (const evidence of nList) {
    ghosts = ghosts.filter(g => !g.evidences.includes(evidence))
  }

  return ghosts
}

const getEvidences = evidencesText => {
  const evidences = new Map()
  for (const evTuple of evidencesText.split("\n")) {
    const [ status, evidence ] = evTuple.split(/ (.+)/)
    console.log(status, evidence)
    if (!status || !evidence) break
    evidences.set(evidence, status === EVIDENCE_Y)
  }
  return evidences
}

const saveEvidence = (evidencesText, newEvidence) => {
  if (evidencesText === EVIDENCE_NONE) {
    return `${EVIDENCE_Y} ${newEvidence}\n`
  } else {
    const evidences = getEvidences(evidencesText)
    if (evidences.has(newEvidence)) {
      if (evidences.get(newEvidence)) {
        evidences.set(newEvidence, false)
      } else {
        evidences.delete(newEvidence)
      }
    } else {
      evidences.set(newEvidence, true)
    }
    let str = ""
    for (const [evidence, has] of evidences) {
      str += `${has ? EVIDENCE_Y: EVIDENCE_N} ${evidence}\n`
    }
    if (str === "") {
      str = EVIDENCE_NONE
    }
    return str
  }
}

module.exports = {
  guessGhostEmbed,
  guessGhost,
  getEvidences,
  saveEvidence,

  GHOST_DATABASE,
  GHOST_BANSHEE,
  EVIDENCE_RESET,
  EVIDENCE_NONE,
  EVIDENCE_EMF5,
  EVIDENCE_ORB,
  EVIDENCE_SPIRIT_BOX,
  EVIDENCE_FREEZING,
  EVIDENCE_FINGERPRINTS,
  EVIDENCE_WRITING,
  EVIDENCE_DOTS
}
