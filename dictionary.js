

const easyWords = [
    { word: "moon", clues: ['4 letters', 'Is a star']},
    { word: "fork", clues: ['4 letters', 'A tableware']},
    { word: "elephant", clues: ['8 letters', 'An animal']},
    { word: "spider web", clues: ['2 words', 'Come from a type of insect']},
    { word: 'hat', clues: ['3 letters', 'A fashion accessory']},
    { word: "monkey", clues: ['6 letters', 'An animal']},
    { word: "computer", clues: ['8 letters', 'A machine']},
    { word: "frog", clues: ['4 letters', 'An animal']},
    { word: 'square', clues: ['6 letters', 'A polygon']},
    { word: 'music', clues: ['5 letters', 'An art form']},
    { word: 'bench', clues: ['5 letters', 'A furniture']},
    { word: 'curl', clues: ['4 letters', 'A mathematical term']},
    { word: 'backpack', clues: ['8 letters', 'A cloth sack carried on one\'s back']},
    { word: 'monster', clues: ['7 letters', 'A type of grotesque creature']},
    { word: 'alive', clues: ['5 letters', 'Something that has life']},
    { word: 'purse', clues: ['5 letter', 'A small bag']},
    { word: 'family', clues: ['6 letters', 'A group of people that are related']},
    { word: 'orange', clues: ['6 letters', 'A fruit']},
    { word: 'jar', clues: ['3 letters', 'A type of container']},
    { word: 'rainbow', clues: ['7 letters', 'A multicolored arc in the sky']},
    { word: 'girl', clues: ['4 letters', 'A young woman']},
    { word: 'sun', clues: ['3 letters', 'A star']},
    { word: 'bell', clues: ['4 letters', 'A instrument']},
    { word: 'knee', clues: ['4 letters', 'Helps you bend your legs']},
    { word: 'ocean', clues: ['5 letters', 'A body of water']},
    { word: 'tree', clues: ['4 letters', 'A plant']},
    { word: 'bird', clues: ['4 letters', 'It can fly']},
    { word: 'rock', clues: ['4 letters', 'A naturally occurring solid of minerals or mineraloids']},
    { word: 'triangle', clues: ['8 letters', 'A polygon']},
    { word: 'crayon', clues: ['6 letters', 'A tool for coloring']},
    { word: 'ants', clues: ['4 letters', 'A type of insect']},
    { word: 'cookie', clues: ['6 letters', 'A type of food']},
    { word: 'bed', clues: ['3 letters', 'A furniture']},
    { word: 'apple', clues: ['5 letters', 'A fruit']},
    { word: 'airplane', clues: ['8 letters', 'A transportation']},
    { word: 'hair', clues: ['4 letters', 'Grows on your head']},
    { word: 'kite', clues: ['4 letters', 'A toy that can fly']},
    { word: 'socks', clues: ['5 letters', 'A type of clothing']},
    { word: 'hippo', clues: ['5 letters', 'An animal']},
    { word: 'owl', clues: ['3 letters', 'An animal']},
    { word: 'alligator', clues: ['9 letters', 'An animal']},
    { word: 'ice cream cone', clues: ['3 words', 'A eaterble cup']},
    { word: 'starfish', clues: ['8 letters', 'Patrick']},
    { word: 'mouse', clues: ['5 letters', 'An animal']},
    { word: 'camera', clues: ['6 letters', 'A machine']},
    { word: 'mouth', clues: ['5 letters', 'You eat with it']},
    { word: 'star', clues: ['4 letters', 'Located in the sky']},
    { word: 'tail', clues: ['4 letters', 'Some animals have this']},
    { word: 'monster', clues: ['7 letters', 'In your closet or under your bed']},
    { word: 'blocks', clues: ['6 letters', 'rectangles']},
    { word: 'grapes', clues: ['6 letters', 'fruit']},
    { word: 'worm', clues: ['4 letters', 'animal']},
    { word: 'king', clues: ['4 letters', 'royalty']},
    { word: 'football', clues: ['8 letters', 'A sport']},
    { word: 'bracelet', clues: ['8 letters', 'An accessory']},
    { word: 'lemon', clues: ['5 letters', 'Fruit']},
    { word: 'dog', clues: ['3 letters', 'animal']},
    { word: 'basketball', clues: ['10 letters', 'A sport']},
    { word: 'arm', clues: ['3 letters', 'A body part']},
    { word: 'plant', clues: ['5 letters', 'A living thing']},
    { word: 'hook', clues: ['4 letters', 'Peter Pan']},
    { word: 'cat', clues: ['3 letters', 'animal']},
    { word: 'hair', clues: ['4 letters', 'A body part']},
    { word: 'caterpillar', clues: ['11 letters', 'An animal']},
    { word: 'cow', clues: ['3 letters', 'An animal']},
    { word: 'broom', clues: ['5 letters', 'Found at home']},
    { word: 'blanket', clues: ['7 letters', 'Found in the bedroom']},
    { word: 'eye', clues: ['3 letters', 'A body part']},
    { word: 'rock', clues: ["4 letters", 'Beats scissors']},
    { word: 'daisy', clues: ['5 letters', 'A type of flower']},
    { word: 'kitten', clues: ['6 letters', 'A baby animal']},
    { word: 'woman', clues: ['5 letters', 'human']},
    { word: 'dragon', clues: ['6 letters', 'Mythical Creature']},
    { word: 'bee', clues: ['3 letters', 'An animal']},
    { word: 'pie', clues: ['3 letters', 'Food']},
    { word: 'cookie', clues: ["6 letters", "Dessert"]},
    { word: 'shirt', clues: ['5 letters', 'Clothing']},
    { word: 'zigzag', clues: ['6 letters', 'Not straight']},
    { word: 'robot', clues: ['5 letters', 'Not human']},
    { word: 'cheese', clues: ["6 letters", 'Food']},
    { word: 'sea', clues: ['3 letters', 'Geography']},
    { word: 'heart', clues: ['5 letters', 'Body part']},
    { word: 'ears', clues: ['4 letters', 'Body part']},
    { word: 'banana', clues: ['6 letters', 'Fruit']},
    { word: 'candy', clues: ['5 letters', 'Dessert?']},
    { word: 'Earth', clues: ['5 letters', 'Our home']},
    { word: 'chimney', clues: ['7 letters', 'Found in some homes']},
    { word: 'starfish', clues: ['8 letters', 'Sea Animal']},
    { word: 'ear', clues: ['3 letters', 'A body part']},
    { word: 'angel', clues: ['5 letters', 'Heavenly']},
    { word: 'horse', clues: ['5 letters', 'An Animal']},
    { word: 'door', clues: ["4 letters", "Found in homes and buildings"]},
    { word: 'slide', clues: ['5 letters', 'Found in playgrounds']},
    { word: "point", clues: ['5 letters', 'score']},
    { word: "mouth", clues: ['5 letters', 'A body part']},
    { word: "telephone", clues: ['9 letters', 'Found at home or in your hand']},
    { word: "chin", clues: ['4 letters', 'A body part']},
    { word: "smile", clues: ['5 letters', 'On your face']},
    { word: "cheek", clues: ['5 letters', 'A body part']},
    { word: "ear", clues: ['3 letters', 'A body part']},
    { word: "room", clues: ['4 letters', 'Found in buildings']},
    { word: "turtle", clues: ['6 letters', 'An Animal']},
    { word: "wings", clues: ['5 letters', 'Found on some animals']},
    { word: "doll", clues: ['4 letters', 'a toy']},
    { word: "bird", clues: ['4 letters', 'Type of animal']},
    { word: "spider", clues: ['6 letters', 'Type of animal']},
    { word: "hopscotch", clues: ['9 letters', 'playground game']},
    { word: "happy", clues: ['5 letters', 'An emotion']},
    { word: "baby", clues: ['4 letters', 'young']},
    { word: "pig", clues: ['3 letters', 'An animal']},
    { word: "jump", clues: ['4 letters', 'Verb']},
    { word: "crayon", clues: ['6 letters', 'Drawing tool']},
    { word: "rabbit", clues: ['6 letters', 'An Animal']},
    { word: "book", clues: ['4 letters', 'Reading']},
    { word: "camera", clues: ['6 letters', 'Photos']},
    { word: "chicken", clues: ['7 letters', 'An animal']},
    { word: "drink", clues: ['5 letters', 'Not eating']},
    { word: "balloon", clues: ['7 letters', 'Pop']},
    { word: "kangaroo", clues: ['8 letters', 'An animal']},
    { word: "clap", clues: ['4 letters', 'applause']},
    { word: "baseball", clues: ['8 letters', 'A sport']},
    { word: "milk", clues: ['4 letters', 'drinkable']},
    { word: "circle", clues: ['6 letters', 'round']},
    { word: "sneeze", clues: ['6 letters', 'Achoo!']},
    { word: "flower", clues: ['6 letters', 'Pretty and smell nice']},
    { word: "pillow", clues: ['6 letters', 'Found in the bedroom']},
    { word: "Sleep", clues: ['5 letters','Tired']},
    { word: "Eat", clues: ['3 letters', 'hungry']},
    { word: "Toothbrush", clues: ['10 letters', 'Found in the bathroom']},
    { word: "Apple", clues: ['5 letters', 'A fruit']},
    { word: "Pen", clues: ['3 letters', 'Writing']},
    { word: "Swing", clues: ['5 letters', 'Found on a playground']},
    { word: "Blinking", clues: ['8 letters', 'an action']},
    { word: "Door", clues: ['4 letters', 'found in a building']},
    { word: "Stop", clues: ['4 letters', 'A sign']},
    { word: "Dance", clues: ['5 letters', 'A sport']},
    { word: "Skip", clues: ['4 letters', 'An action']},
    { word: "Kick", clues: ['4 letters', 'An action']}
]

const mediumWords = [
    { word: "artist", clues: ["6 letters", "a job"]},
    { word: "tire", clues: ["4 letters", "an object"]},
    { word: "glass", clues: ["5 letters", "material type"]},
    { word: "brush", clues: ["5 letters", "a tool"]},
    { word: "key", clues: ["3 letters", "a small object"]},
    { word: "mouth", clues: ["5 letters", "a body part"]},
    { word: "waterfall", clues: ["9 letters", "a part of nature"]},
    { word: "iron", clues: ["4 letters", "metal"]},
    { word: "poodle", clues: ["6 letters", "dog"]},
    { word: "librarian", clues: ["9 letters", "a job"]},
    { word: "window", clues: ["6 letters", "in a house"]},
    { word: "sandal", clues: ["6 letters", "clothing"]},
    { word: "parachute", clues: ["9 letters", "for when you're falling"]},
    { word: "seashell", clues: ["8 letters", "beach"]},
    { word: "crown", clues: ["5 letters", "royalty"]},
    { word: "lawn mower", clues: ["2 words", "grass"]},
    { word: "manatee", clues: ["7 letters", "an animal"]},
    { word: "shade", clues: ["5 letters", "intangible object"]},
    { word: "gap", clues: ["3 letters", "intangible object"]},
    { word: "dustpan", clues: ["7 letters", "tool at home"]},
    { word: "cobra", clues: ["5 letters", "animal"]},
    { word: "lip", clues: ["3 letters", "body part"]},
    { word: "photograph", clues: ["10 letters", "memories"]},
    { word: "newborn", clues: ["7 letters", "baby"]},
    { word: "penguin", clues: ["7 letters", "animal"]},
    { word: "dinner", clues: ["6 letters", "are you hungry?"]},
    { word: "canoe", clues: ["5 letters", "vehicle of transportation"]},
    { word: "button", clues: ["6 letters", "HTML Element!"]},
    { word: "scissors", clues: ["8 letters", "tool"]},
    { word: "drums", clues: ["5 letters", "instrument"]},
    { word: "banjo", clues: ["5 letters","instrument"]},
    { word: "toilet paper", clues: ["2 words", "bathroom"]},
    { word: "daddy longlegs", clues: ["2 words", "animal"]},
    { word: "slope", clues: ["5 letters", "noun"]},
    { word: "skate", clues: ["5 letters", "on ice or on land"]},
    { word: "hurricane", clues: ["9 letters", "You don't want to be near one"]},
    { word: "eraser", clues: ["6 letters", "writing utensil"]},
    { word: "vest", clues: ["4 letters", "article of clothing"]},
    { word: "shake", clues: ["5 letters", "drink or action"]},
    { word: "doghouse", clues: ["8 letters", "for a pet"]},
    { word: "match", clues: ["5 letters", "light a candle"]},
    { word: "soup", clues: ["4 letters", "food"]},
    { word: "electricity", clues: ["11 letters", "Benjamin Franklin"]},
    { word: "tongue", clues: ["6 letters", "body part"]},
    { word: "germ", clues: ["4 letters", "makes you sick"]},
    { word: "wheelbarrow", clues: ["11 letters", "when things are too heavy"]},
    { word: "rocket", clues: ["6 letters", "space"]},
    { word: "tissue", clues: ["6 letters", "there there, don't cry"]},
    { word: "sailboat", clues: ["8 letters", "vehicle of transport"]},
    { word: "strawberry", clues: ["10 letters", "food"]},
    { word: "thief", clues: ["5 letters", 'a person']},
    { word: "cougar", clues: ['6 letters', 'an animal']},
    { word: "basket", clues: ['6 letters', 'you hold it']},
    { word: "present", clues: ['7 letters', 'christmas!']},
    { word: "swim", clues: ['4 letters', 'a sport']},
    { word: "peanut", clues: ['6 letters', 'Food']},
    { word: "saddle", clues: ['6 letters', 'You sit on it']},
    { word: "banana split", clues: ['2 words', 'A dessert']},
    { word: "ferry", clues: ['5 letters', 'A mode of transportation']},
    { word: "pinecone", clues: ['8 letters', 'Found on some trees']},
    { word: "oil", clues: ['3 letters', 'Slippery']},
    { word: "easel", clues: ['5 letters', 'Used for painting/drawing']},
    { word: "fungus", clues: ['6 letters', 'Not exactly a plant']},
    { word: "stork", clues: ['5 letters', 'A type of bird']},
    { word: "city", clues: ['4 letters', 'geography']},
    { word: "vegetable", clues: ['9 letters', 'A type of food']},
    { word: "bubble", clues: ['6 letters', 'pop']},
    { word: "puddle", clues: ['6 letters', 'Appears when it rains']},
    { word: "ship", clues: ['4 letters', 'A mode of transportation']},
    { word: "open", clues: ['4 letters', 'An adjective']},
    { word: "picture frame", clues: ['2 words', 'Object']},
    { word: "floor", clues: ['5 letters', 'stand on it']},
    { word: "cast", clues: ['4 letters', 'When you break a limb']},
    { word: "artist", clues: ['6 letters', 'Music or paintings']},
    { word: "race car", clues: ['2 words', 'NASCAR']},
    { word: "pelican", clues: ['7 letters', 'A type of bird']},
    { word: "spot", clues: ['4 letters', 'Dot']},
    { word: "snowball", clues: ['8 letters', 'You throw it']},
    { word: "suitcase", clues: ['8 letters', 'Often brought when traveling']},
    { word: "tub", clues: ['3 letters', 'Found in a bathroom']},
    { word: "shallow", clues: ['7 letters', 'Deep']},
    { word: "cotton candy", clues: ['2 words', 'Found in carnivals and fairs']},
    { word: "gate", clues: ['4 letters', 'similar to fences']},
    { word: "full moon", clues: ['2 words', 'Perfectly round']},
    { word: "chin", clues: ['4 letters', 'A body part']},
    { word: "windmill", clues: ['8 letters', 'Old air turbines']},
    { word: "birthday cake", clues: ['2 words', 'Youre older!']},
    { word: "camera", clues: ['6 letters', 'Say cheese']},
    { word: "mold", clues: ['4 letters', 'a type of fungus']},
    { word: "kiss", clues: ['4 letters', 'Lips']},
    { word: "wallet", clues: ['6 letters', 'Store money']},
    { word: "soccer", clues: ['6 letters', 'A sport']},
    { word: "base", clues: ['4 letters', 'First, second, third']},
    { word: "saw", clues: ['3 letters', 'carpenters tool']},
    { word: "skirt", clues: ['5 letters', 'article of clothing']},
    { word: "zoo", clues: ["3 letters", "animals!"]},
    { word: "t-shirt", clues: ['6 letters', 'article of clothing']},
    { word: "fern", clues: []},
    { word: "artist", clues: []},
    { word: "root", clues: []},
    { word: "tape", clues: []},
    { word: "calendar", clues: []},
    { word: "sandal", clues: []},
    { word: "attic", clues: []},
    { word: "stick", clues: []},
    { word: "east", clues: []},
    { word: "pretzel", clues: []},
    { word: "brain", clues: []},
    { word: "mold", clues: []},
    { word: "hairbrush", clues: []},
    { word: "submarine", clues: []},
    { word: "college", clues: []},
    { word: "dolphin", clues: []},
    { word: "curve", clues: []},
    { word: "scale", clues: []},
    { word: "coconut", clues: []},
    { word: "sleeve", clues: []},
    { word: "rose", clues: []},
    { word: "television", clues: []},
    { word: "glove", clues: []},
    { word: "latitude", clues: []},
    { word: "hotel", clues: []},
    { word: "wick", clues: []},
    { word: "cabin", clues: []},
    { word: "safe", clues: []},
    { word: "rake", clues: []},
    { word: "queen", clues: []},
    { word: "squirt gun", clues: []},
    { word: "reindeer", clues: []},
    { word: "flood", clues: []},
    { word: "lake", clues: []},
    { word: "battery", clues: []},
    { word: "bell pepper", clues: []},
    { word: "strap", clues: []},
    { word: "anvil", clues: []},
    { word: "parachute", clues: []},
    { word: "faucet", clues: []},
    { word: "garden", clues: []},
    { word: "pear", clues: []},
    { word: "dimple", clues: []},
    { word: "mouse pad", clues: []},
    { word: "vest", clues: []},
    { word: "glass", clues: []},
    { word: "hippopotamus", clues: []},
    { word: "whistle", clues: []},
    { word: "toy", clues: []},
    { word: "knight", clues: []},
]

const hardWords = [
    { word: "bleach", clues: ["6 letters", "for your clothes"]},
    { word: "skating rink", clues: ["2 words", "place for fun during the winter"]},
    { word: "rhythm", clues: ["6 letters", "music!"]},
    { word: "log-in", clues: ["5 letters", "username and password"]},
    { word: "lunar rover", clues: ["2 words", "drone on the moon"]},
    { word: "tulip", clues: ['5 letters', 'A type of flower, famous in Netherlands']},
    { word: "lung", clues: ["4 letters", "body part"]},
    { word: "Internet", clues: ["8 letters", "You're using it right now!"]},
    { word: "synchronized swimming", clues: ["2 words", "aquatic olympic sport"]},
    { word: "cherub", clues: ["6 letters", "similar to an angel"]},
    { word: "limit", clues: ["5 letters", "the maximum, the edge"]},
    { word: "videogame", clues: ["9 letters", "to play"]},
    { word: "geyser", clues: ["6 letters", "famous at Yellowstone"]},
    { word: "driveway", clues: ["8 letters", "part of some houses"]},
    { word: "shrew", clues: ["5 letters", "a mole-like animal"]},
    { word: "athlete", clues: ["7 letters", "a job or profession"]},
    { word: "check", clues: ["5 letters", "tick"]},
    { word: "snag", clues: ["4 letters", "grab"]},
    { word: "chestnut", clues: ["8 letters", "delicious"]},
    { word: "exercise", clues: ["8 letters", "healthy for us all!"]},
    { word: "wig", clues: ["3 letters", "hair"]},
    { word: "amusement park", clues: ["2 words", "place to have fun"]},
    { word: "tank", clues: ["4 letters", "military"]},
    { word: "florist", clues: ["7 letters", "a type of shop"]},
    { word: "icicle", clues: ["6 letters", "found in frozen places"]},
    { word: "cheerleader", clues: ["11 letters", "high schools usually have these teams"]},
    { word: "prey", clues: ["4 letters", "hunter and the"]},
    { word: "trip", clues: ["4 letters", "travel"]},
    { word: "compare", clues: ["7 letters", "contrast"]},
    { word: "electrical outlet", clues: ["2 words", "plugs"]},
    { word: "lipstick", clues: ["8 letters", "makeup"]},
    { word: "dead end", clues: ["2 words", "no way out"]},
    { word: "picnic", clues: ["6 letters", "a fun family event"]},
    { word: "tow", clues: ["3 letters", "drag"]},
    { word: "sunburn", clues: ["7 letters", "beaches"]},
    { word: "movie", clues: ["5 letters", "go with friends or a date"]},
    { word: "mascot", clues: ["6 letters", "many organizations have this"]},
    { word: "vein", clues: ["4 letters", "body part"]},
    { word: "fresh water", clues: ["2 words", "necessary for survival"]},
    { word: "dentist", clues: ["7 letters", "occupation"]},
    { word: "living room", clues: ["2 words", "part of the house"]},
    { word: "catalog", clues: ["7 letters", "similar to magazines"]},
    { word: "receipt", clues: ["7 letters", "purchasing items"]},
    { word: "date", clues: ["4 letters", "a lovely night out"]},
    { word: "hot tub", clues: ["2 words", "might be part of your house"]},
    { word: "economics", clues: ["9 letters", "branch of knowledge regarding wealth"]},
    { word: "pigpen", clues: ["6 letters", "where certain animals are kept"]},
    { word: "arcade", clues: ["6 letters", "place to have fun"]},
    { word: "shack", clues: ["5 letters", "similar to a hut or cabin"]},
    { word: "shelter", clues: ["7 letters", "protection"]},
    { word: "biscuit", clues: []},
    { word: "level", clues: []},
    { word: "flu", clues: []},
    { word: "quartz", clues: []},
    { word: "shrink ray", clues: []},
    { word: "gown", clues: []},
    { word: "peasant", clues: []},
    { word: "migrate", clues: []},
    { word: "dream", clues: []},
    { word: "hail", clues: []},
    { word: "palace", clues: []},
    { word: "chestnut", clues: []},
    { word: "glue", clues: []},
    { word: "sword swallower", clues: []},
    { word: "hut", clues: []},
    { word: "cargo", clues: []},
    { word: "engaged", clues: []},
    { word: "best friend", clues: []},
    { word: "cream", clues: []},
    { word: "gold", clues: []},
    { word: "sandpaper", clues: []},
    { word: "hydrogen", clues: []},
    { word: "barbershop", clues: []},
    { word: "wax", clues: []},
    { word: "cattle", clues: []},
    { word: "hour", clues: []},
    { word: "banister", clues: []},
    { word: "yodel", clues: []},
    { word: "cruise ship", clues: []},
    { word: "freshman", clues: []},
    { word: "plumber", clues: []},
    { word: "sunrise", clues: []},
    { word: "nap", clues: []},
    { word: "password", clues: []},
    { word: "robe", clues: []},
    { word: "chariot", clues: []},
    { word: "darts", clues: []},
    { word: "crime", clues: []},
    { word: "driveway", clues: []},
    { word: "wag", clues: []},
    { word: "pharmacist", clues: []},
    { word: "fireman pole", clues: []},
    { word: "carpet", clues: []},
    { word: "song", clues: []},
    { word: "haircut", clues: []},
    { word: "braid", clues: []},
    { word: "foil", clues: []},
    { word: "neighborhood", clues: []},
    { word: "earthquake", clues: []},
    { word: "atlas", clues: []},
    { word: "pain", clues: []},
    { word: "sandpaper", clues: []},
    { word: "commercial", clues: []},
    { word: "monsoon", clues: []},
    { word: "date", clues: []},
    { word: "moth", clues: []},
    { word: "elf", clues: []},
    { word: "edge", clues: []},
    { word: "important", clues: []},
    { word: "migrate", clues: []},
    { word: "laundry detergent", clues: []},
    { word: "hermit crab", clues: []},
    { word: "gold", clues: []},
    { word: "water cycle", clues: []},
    { word: "albatross", clues: []},
    { word: "neighborhood", clues: []},
    { word: "flu", clues: []},
    { word: "drawback", clues: []},
    { word: "spaceship", clues: []},
    { word: "rubber", clues: []},
    { word: "letter opener", clues: []},
    { word: "brand", clues: []},
    { word: "loveseat", clues: []},
    { word: "wooly mammoth", clues: []},
    { word: "spare", clues: []},
    { word: "carat", clues: []},
    { word: "barbershop", clues: []},
    { word: "cartoon", clues: []},
    { word: "runoff", clues: []},
    { word: "rudder", clues: []},
    { word: "twist", clues: []},
    { word: "leather", clues: []},
    { word: "compare", clues: []},
    { word: "rind", clues: []},
    { word: "wool", clues: []},
    { word: "clique", clues: []},
    { word: "palace", clues: []},
    { word: "organ", clues: []},
    { word: "mysterious", clues: []},
    { word: "vanilla", clues: []},
    { word: "pickup truck", clues: []},
    { word: "print", clues: []},
    { word: "jungle", clues: []},
    { word: "houseboat", clues: []},
    { word: "bride", clues: []},
    { word: "sunrise", clues: []},
    { word: "crop duster", clues: []},
    { word: "pharaoh", clues: []},
    { word: "season", clues: []},
    { word: "gold medal", clues: []},
    { word: "car dealership", clues: []},
    { word: "macaroni", clues: []},
    { word: "weather", clues: []},
    { word: "plumber", clues: []},
    { word: "stopwatch", clues: []},
    { word: "zoom", clues: []},
    { word: "softball", clues: []},
    { word: "yodel", clues: []},
    { word: "parking garage", clues: []},
    { word: "vet", clues: []},
    { word: "form", clues: []},
    { word: "name", clues: []},
    { word: "con", clues: []},
    { word: "slump", clues: []},
    { word: "Atlantis", clues: []},
    { word: "destination", clues: []},
    { word: "scatter", clues: []},
    { word: "publisher", clues: []},
    { word: "mine cart", clues: []},
    { word: "gravel", clues: []},
    { word: "intern", clues: []},
    { word: "confidant", clues: []},
    { word: "stockholder", clues: []},
    { word: "quarrantine", clues: []},
    { word: "random", clues: []},
    { word: "rival", clues: []},
    { word: "dugout", clues: []},
    { word: "title", clues: []},
    { word: "cashier", clues: []},
    { word: "employee", clues: []},
    { word: "mayhem", clues: []},
    { word: "soul", clues: []},
    { word: "index", clues: []},
    { word: "century", clues: []},
    { word: "expired", clues: []},
    { word: "statement", clues: []},
    { word: "sophomore", clues: []},
    { word: "chord", clues: []},
    { word: "villain", clues: []},
    { word: "observatory", clues: []},
    { word: "plot", clues: []},
    { word: "Big Bang Theory", clues: []},
    { word: "stun", clues: []},
    { word: "feeling", clues: []},
    { word: "blueprint", clues: []},
    { word: "admire", clues: []},
    { word: "tutor", clues: []},
    { word: "welder", clues: []},
    { word: "consent", clues: []},
    { word: "translate", clues: []},
    { word: "ligament", clues: []},
    { word: "fuel", clues: []},
]








module.exports = {easyWords, mediumWords, hardWords};