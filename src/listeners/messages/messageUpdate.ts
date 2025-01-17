import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import type { Message } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.MessageUpdate
})
/**
 * Replay Message events for handling upon update
 */
export default class messageUpdate extends Listener {
  public run(oldMsg: Message, newMsg: Message) {
    if (oldMsg.content === newMsg.content) return null

    return this.container.client.emit(Events.MessageCreate, newMsg)
  }
}
