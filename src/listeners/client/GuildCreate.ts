import GuildModel from '#lib/Models/GuildSettings'
import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import type { Guild } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.GuildCreate
})
export default class GuildCreate extends Listener {
  public async run(guild: Guild): Promise<void> {
    await new GuildModel({ guild_id: guild.id }).save()
    await guild.members.fetch()
    return this.container.logger.info(`Joined ${guild.name} (${guild.id})`)
  }
}
