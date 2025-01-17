import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import crypto from 'crypto-js'
import { Message, Permissions } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  aliases: ['rc4drop'],
  description: 'commands/cryptography:RC4Description',
  usage: '<text> <--secret=<randomLetters> or -s=<randomLetters>>',
  options: ['secret', 's'],
  flags: ['d', 'decrypt']
})
export default class RC4Drop extends ArielCommand {
  public async run(message: Message, args: ArielCommand.Args) {
    const decryptFlag = args.getFlags('d', 'decrypt')
    const text = (await args.restResult('string')).value
    const secret = args.getOption('s', 'secret')

    if (!text) return await message.channel.send(args.t('commands/cryptography:noText'))

    if (!secret) {
      return await message.channel.send(args.t('commands/cryptography:noSecret'))
    }

    if (message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) await message.delete()

    const result = decryptFlag ? this.decrypt(text, secret) : this.encrypt(text, secret)

    return await message.channel.send(result)
  }

  /**
   * Input: ABC
   * Secret: ABC
   * Output: U2FsdGVkX1/64CRgHLq4o4+2uPg=
   */
  private encrypt(input: string, secret: string): string {
    return crypto.RC4Drop.encrypt(input, secret).toString()
  }

  /**
   * Input: U2FsdGVkX1/64CRgHLq4o4+2uPg=
   * Secret: ABC
   * Output: ABC
   */
  private decrypt(input: string, secret: string): string {
    return crypto.RC4Drop.decrypt(input, secret).toString(crypto.enc.Utf8)
  }
}
