module.exports = {
  isoToPretty: iso => new Date(iso).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', timeZoneName: "short" })
}
