import GuildSettings from '#lib/Models/GuildSettings'
import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import type { Message } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCreate
})
export default class AntiInvites extends Listener {
  private readonly regex: RegExp = /(http|https?:\/\/)?(www\.)?(discord\.gift|discord(app)?\.com\/gifts)\/(\s)?.+/iu

  public async run(message: Message) {
    if (!this.regex.test(message.content)) return null

    const { anti } = await GuildSettings.findOne({ guild_id: message.guild.id })

    if (!anti.gifts) return null

    return await message.delete()
  }
}
