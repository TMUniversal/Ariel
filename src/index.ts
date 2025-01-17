import GuildSettings from '#lib/Models/GuildSettings'
import type { InternationalizationContext } from '@sapphire/plugin-i18next'
import type { FormatFunction } from 'i18next'
import cfg from './config'
import Client from './lib/Structures/client'
import Logger from './lib/Structures/Logger'

const client = new Client({
  defaultPrefix: cfg.prefix,
  regexPrefix: /^(hey +)?ariel[,! ]/i,
  caseInsensitivePrefixes: true,
  caseInsensitiveCommands: true,
  logger: { instance: new Logger('Ariel') },
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_BANS', 'GUILD_WEBHOOKS', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS'],
  i18n: {
    fetchLanguage: async (message: InternationalizationContext) => {
      const { language } = await GuildSettings.findOne({ guild_id: message.guild.id })

      return language
    },
    i18next: (_: string[], languages: string[]) => ({
      supportLngs: languages,
      preload: languages,
      load: 'all',
      initImmediate: false,
      fallbackLng: 'en-US',
      returnObjects: true,
      returnEmptyString: false,
      returnNull: false,
      interpolation: {
        escapeValue: false,
        format: (...[value, format]: Parameters<FormatFunction>) => {
          switch (format) {
            case 'permissions': {
              return (value as string[]).map(v => `\`${v}\``).join(', ')
            }
            default:
              return value as string
          }
        }
      }
    })
  },
  api: {
    listenOptions: {
      port: 4000
    },
    prefix: '/v1/'
  }
})

void client.start()
