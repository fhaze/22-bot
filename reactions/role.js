const getUserAndRoleAndExecute = (reaction, user, func) => {
  const embed = reaction.message.embeds[0]
  const rolesTuple = embed.description.split("\n")

  for (let roleTuple of rolesTuple) {
    const [emoji, role] = roleTuple.split(" ")
    if (emoji.includes(reaction.emoji.id)) {
      const r = reaction.message.guild.roles.cache.find(r => role.includes(r.id))
      const u = reaction.message.guild.members.cache.find(m => m.id === user.id)
      u.roles[func](r)
    }
  }
}

module.exports = {
  title: "Role Chooser",
  add: (reaction, user) => {
    getUserAndRoleAndExecute(reaction, user, "add")
  },
  remove: (reaction, user) => {
    getUserAndRoleAndExecute(reaction, user, "remove")
  }
}
