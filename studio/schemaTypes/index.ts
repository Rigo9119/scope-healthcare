import {homePageType} from './documents/homePage'
import {siteSettingsType} from './documents/siteSettings'
import {pillarItemType} from './documents/pillarItem'
import {teamMemberType} from './documents/teamMember'
import {heroType} from './objects/hero'
import {statItemType} from './objects/statItem'
import {specialtyItemType} from './objects/specialtyItem'
import {journeyStepType} from './objects/journeyStep'
import {reasonType} from './objects/reason'
import {seoType} from './objects/seo'
import {testimonialType} from './objects/testimonial'

export const schemaTypes = [
  // Documents
  homePageType,
  siteSettingsType,
  pillarItemType,
  teamMemberType,
  // Objects
  heroType,
  statItemType,
  specialtyItemType,
  journeyStepType,
  reasonType,
  testimonialType,
  seoType,
]
