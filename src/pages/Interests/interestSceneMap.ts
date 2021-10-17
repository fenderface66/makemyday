export type interest =
  'alcohol'
  | 'beer'
  | 'reading'
  | 'learning'
  | 'adrenaline'
  | 'outgoing'
  | 'amusement'
  | 'socialising'
  | 'coding'
  | 'coffee'
  | 'working'
  | 'tech'
  | 'knitting'
  | 'photography'
  | 'art'
  | 'style'
  | 'golf'
  | 'sport'
  | 'hiking'
  | 'emotional'
  | 'friendship'
  | 'relationship'
  | 'cooking'
  | 'vegan'
  | 'laughter'
  | 'food'
  | 'junk_food'
  | 'pizza'
  | 'nature'
  | 'plants'
  | 'gardening'
  | 'instruments'
  | 'guitar'
  | 'music'
  | 'video_games'
  | 'pottery'
  | 'music_production'
  | 'electronic_music'
  | 'shuttlecock'
  | 'racket_sports'
  | 'skateboarding'
  | 'action_sport'
  | 'snorkling'
  | 'sea_activities'
  | 'intellectualism'
  | 'star_wars'
  | 'nerd_culture'
  | 'tidiness'
  | 'apple_tech'
  | 'interior_design'
  | 'comfiness'
  | 'retro_culture'

export const interestSceneMap: {
  [index: string]: interest[]
} = {
  'beer_being_poured': ['alcohol', 'beer'],
  'book_and_glasses': ['reading', 'learning'],
  'carnival_ride': ['adrenaline', 'outgoing', 'amusement'],
  'cheers_with_beer': ['alcohol', 'beer', 'socialising'],
  'cheers_with_coffee': ['coffee', 'socialising'],
  'coding_on_tidy_desk': ['coding', 'working', 'tech'],
  'collection_of_craft_items': ['knitting', 'photography', 'art'],
  'gadgets': ['tech', 'photography', 'style'],
  'golf': ['golf', 'sport'],
  'hiking_outside': ['hiking'],
  'holding_a_camera': ['photography', 'art'],
  'hugging_friends_on_hike': ['hiking', 'emotional', 'friendship', 'relationship'],
  'ingredients_on_chopping_board': ['cooking', 'vegan'],
  'laughing_with_friends_outdoors': ['friendship', 'laughter'],
  'pizza': ['food', 'junk_food', 'pizza'],
  'planting': ['nature', 'plants', 'gardening'],
  'playing_guitar': ['instruments', 'guitar', 'music'],
  'playing_playstation': ['video_games', 'socialising'],
  'pottery': ['pottery', 'art'],
  'producing_electronic_music': ['music_production', 'electronic_music', 'music'],
  'shuttlecock': ['shuttlecock', 'racket_sports', 'sport'],
  'skateboarding': ['skateboarding', 'action_sport'],
  'snorkling': ['snorkling', 'sea_activities'],
  'stack_of_books': ['reading', 'intellectualism'],
  'stormtrooper': ['star_wars', 'nerd_culture'],
  'tidy_apple_tech_desk': ['tidiness', 'apple_tech', 'tech'],
  'tidy_room': ['interior_design', 'comfiness'],
  'videogame_arcade': ['video_games', 'retro_culture', 'amusement'],
}
