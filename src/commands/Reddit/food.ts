import type { ArielCommandOptions } from '#lib/Structures/Command'
import { ArielRedditCommand } from '#lib/Structures/RedditCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { PieceContext } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  description: 'Returns a Image from r/foodporn',
  cooldownLimit: 3,
  cooldownDelay: 2000
})
export default class FoodPorn extends ArielRedditCommand {
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super({ subreddit: 'foodporn', nsfw: false, colour: 'ORANGE' }, Context, options)
  }
}
