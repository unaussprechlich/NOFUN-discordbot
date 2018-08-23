import {Client, Message, PresenceData, Snowflake, VoiceConnection} from "discord.js";
import * as AWS from "aws-sdk"
import * as Stream from "stream"
import * as ytdl from "ytdl-core"
import * as fs from "fs";
import {VoiceId} from "aws-sdk/clients/polly";
import {Readable} from "stream";

const status : PresenceData[] = [
    {game : {name : "with ze waifu pillow!", type : "PLAYING", url : "https://discordapp.com/oauth2/authorize?client_id=481915476256096267&scope=bot&permissions=8"}},
    {game : {name : "!nofun help", type :  "PLAYING" , url : "https://discordapp.com/oauth2/authorize?client_id=481915476256096267&scope=bot&permissions=8"}},
    {game : {name : "\_RealDeal_.mp4", type :  "WATCHING" , url : "https://discordapp.com/oauth2/authorize?client_id=481915476256096267&scope=bot&permissions=8"}}
];

const memes : String [] = ["https://youtu.be/zA52uNzx7Y4",
    "https://youtu.be/cRpdIrq7Rbo",
    "https://youtu.be/dv13gl0a-FA?t=1m4s",
    "https://youtu.be/XCiDuy4mrWU?t=24s",
    "https://youtu.be/LBjUh4bYF8w",
    "https://youtu.be/KmtzQCSh6xk",
    "https://youtu.be/QXPAZJvbH1s",
    "https://youtu.be/XOMT3bRJXOo",
    "https://youtu.be/cEuU64Zt4B0?t=11s",
    "https://youtu.be/aI10UC2Tzs4",
    "https://youtu.be/4kOX-qE6Ka4",
    "https://youtu.be/oHg5SJYRHA0?t=43s",
    "https://youtu.be/gwWRjvwlLKg",
    "https://youtu.be/CZlfbep2LdU",
    "https://youtu.be/tVj0ZTS4WF4",
    "https://youtu.be/IjhTVbUFMek?t=7s",
    "https://youtu.be/vfc42Pb5RA8",
    "https://youtu.be/EaKDOYTZbJg?t=30s",
    "https://youtu.be/WD33ii01kXI?t=25s",
    "https://youtu.be/E8gmARGvPlI",
    "https://youtu.be/jE-_wspHCDY?t=26s",
    "https://youtu.be/PfYnvDL0Qcw?t=28s",
    "https://youtu.be/6IdKTZwdBb8?t=6s",
    "https://youtu.be/bsUWK-fixiA?t=1m2s",
    "https://youtu.be/0cOAUSVBGX8?t=7s",
    "https://youtu.be/otCpCn0l4Wo?t=51s",
    "https://youtu.be/3j4t185wl-0?t=36s",
    "https://youtu.be/XAYhNHhxN0A?t=3s",
    "https://youtu.be/NvS351QKFV4?t=25s",
    "https://youtu.be/6vYnas6q3Sg?t=33s",
    "https://youtu.be/hp5sAUdgd-A",
    "https://youtu.be/My2FRPA3Gf8?t=1m34s",
    "https://youtu.be/_V2sBURgUBI",
    "https://youtu.be/9ffL573XI50?t=20s",
    "https://youtu.be/LH5ay10RTGY?t=12s",
    "https://youtu.be/Ysqh1uzqGrc",
    "https://youtu.be/EIyixC9NsLI",
    "https://youtu.be/eDU0CTDMk2g",
    "https://youtu.be/cOy6hqzfsAs",
    "https://youtu.be/b1d7Llx4rm8",
    "https://youtu.be/9OPc7MRm4Y8",
    "https://youtu.be/2s4slliAtQU",
    "https://youtu.be/_LBmUwi6mEo?t=16s",
    "https://youtu.be/q_9SsX7HJhE",
    "https://youtu.be/PFbeP6YqHzg?t=12s",
    "https://youtu.be/Bg59q4puhmg?t=1m12s",
    "https://youtu.be/WI0mSEzttx8?t=55s",
    "https://youtu.be/v3rhQc666Sg",
    "https://youtu.be/6ZWwqTnqxdk?t=17s",
    "https://youtu.be/RbtPXFlZlHg?t=45s",
    "https://youtu.be/HMUDVMiITOU?t=20s",
    "https://youtu.be/ioE_O7Lm0I4",
    "https://youtu.be/QK8mJJJvaes",
    "https://youtu.be/kffacxfA7G4?t=44s",
    "https://youtu.be/c3t9hM6jcbY?t=13s",
    "https://youtu.be/TYgOlqinH7A?t=21s",
    "https://youtu.be/X3oOQ8XnQWU?t=1m15s",
    "https://youtu.be/4G6QDNC4jPs?t=33s",
    "https://youtu.be/QGJuMBdaqIw?t=1m16s",
    "https://youtu.be/_zR6ROjoOX0?t=1m9s",
    "https://youtu.be/Mz3Mi_OZYno",
    "https://youtu.be/tAp9BKosZXs?t=34s",
    "https://youtu.be/CMU2NwaaXEA",
    "https://youtu.be/04854XqcfCY?t=39s",
    "https://youtu.be/fJ9rUzIMcZQ?t=2m27s",
    "https://youtu.be/L0MK7qz13bU?t=1m5s",
    "https://youtu.be/PWgvGjAhvIw?t=1m7s",
    "https://youtu.be/3soskkvYBgM",
    "https://youtu.be/DUT5rEU6pqM?t=19s",
    "https://youtu.be/qeMFqkcPYcg",
    "https://youtu.be/e8-sMJZTYf0?t=8s",
    "https://youtu.be/Ys7-6_t7OEQ?t=1m20s",
    "https://youtu.be/vjW8wmF5VWc?t=28s",
    "https://youtu.be/O-zpOMYRi0w?t=41s",
    "https://youtu.be/YvWMfpop334",
    "https://youtu.be/IAR5cqVYQKw",
    "https://youtu.be/JuYeHPFR3f0?t=7s",
    "https://youtu.be/5FjWe31S_0g",
    "https://youtu.be/bFEoMO0pc7k?t=6s",
    "https://youtu.be/fbGkxcY7YFU?t=43s",
    "https://youtu.be/17O3lL1aUrg",
    "https://youtu.be/MFmr_TZLpS0",
    "https://youtu.be/20Oww4VCWOc?t=37s",
    "https://youtu.be/YQHsXMglC9A?t=1m21s",
    "https://youtu.be/B2jVbSI9H4o",
    "https://youtu.be/wlWCPVgYJZE",
    "https://youtu.be/KqhfLTsEeZg?t=17s",
    "https://youtu.be/LOZuxwVk7TU?t=14s",
    "https://youtu.be/l5aZJBLAu1E?t=57s",
    "https://youtu.be/FuX5_OWObA0",
    "https://youtu.be/-cZ7ndjhhps?t=12s",
    "https://youtu.be/IvxRsDpXPGo?t=1m3s",
    "https://youtu.be/kdemFfbS5H0?t=36s",
    "https://youtu.be/X1Fqn9du7xo?t=48s",
    "https://youtu.be/RaCodgL9cvk?t=13s",
    "https://youtu.be/btPJPFnesV4",
    "https://youtu.be/9jK-NcRmVcw?t=53s",
    "https://youtu.be/xFrGuyw1V8s?t=1m27s",
    "https://youtu.be/unfzfe8f9NI?t=57s",
    "https://youtu.be/XEjLoHdbVeE?t=19s",
    "https://youtu.be/HEXWRTEbj1I?t=4s",
    "https://youtu.be/3CS93CdMv_E",
    "https://youtu.be/w4oHBoeuZ10?t=17s",
    "https://youtu.be/L_jWHffIx5E?t=37s",
    "https://youtu.be/0RpdPzJgaBw",
    "https://youtu.be/hQo1HIcSVtg?t=55s",
    "https://youtu.be/fljKx9nvrL4?t=34s",
    "https://youtu.be/HoJuQYoLdG4?t=12s",
    "https://youtu.be/EwTZ2xpQwpA",
    "https://youtu.be/LiaYDPRedWQ?t=54s",
    "https://youtu.be/ZZ5LpwO-An4",
    "https://youtu.be/g-sgw9bPV4A?t=9s",
    "https://youtu.be/aZmsJztrsuM",
    "https://youtu.be/b3_lVSrPB6w",
    "https://youtu.be/K5tVbVu9Mkg?t=4s",
    "https://youtu.be/t6q5_7fVjEg?t=40s",
    "https://youtu.be/4txVqr1eNwc?t=22s",
    "https://youtu.be/Cwkej79U3ek?t=31s",
    "https://youtu.be/WIKqgE4BwAY?t=7s",
    "https://youtu.be/H8Qp38qT-xI?t=23s",
    "https://youtu.be/TeccAtqd5K8?t=1m4s",
    "https://youtu.be/iubJ-XSL9go",
    "https://youtu.be/oavMtUWDBTM?t=6s",
    "https://youtu.be/SLMJpHihykI?t=10s",
    "https://youtu.be/8UVNT4wvIGY?t=1m33s",
    "https://youtu.be/ZnHmskwqCCQ",
    "https://youtu.be/Z3ZAGBL6UBA",
    "https://youtu.be/astISOttCQ0?t=8s",
    "https://youtu.be/J---aiyznGQ",
    "https://youtu.be/qItugh-fFgg?t=16s",
    "https://youtu.be/QH2-TGUlwu4?t=4s",
    "https://youtu.be/7wfYIMyS_dI?t=1m4s",
    "https://youtu.be/Tx1XIm6q4r4?t=32s",
    "https://youtu.be/izGwDsrQ1eQ",
    "https://youtu.be/mYMLFiBRD3U?t=31s",
    "https://youtu.be/GRWbIoIR04c",
    "https://youtu.be/3JWTaaS7LdU?t=1m47s",
    "https://youtu.be/Gd9OhYroLN0?t=27s",
    "https://youtu.be/k85mRPqvMbE?t=7s",
    "https://youtu.be/djV11Xbc914?t=54s",
    "https://youtu.be/ZLa__49Ltv4?t=10s",
    "https://youtu.be/Fsj2wdFDmLk?t=44s",
    "https://youtu.be/uxpDa-c-4Mc?t=33s",
    "https://youtu.be/ZyhrYis509A?t=15s",
    "https://youtu.be/jofNR_WkoCE?t=40s",
    "https://youtu.be/X3aCTwXNTX8?t=14s",
    "https://youtu.be/6hzrDeceEKc?t=38s",
    "https://youtu.be/q6-ZGAGcJrk?t=7s",
    "https://youtu.be/YJVmu6yttiw?t=26s",
    "https://youtu.be/4m1EFMoRFvY",
    "https://youtu.be/J9FImc2LOr8?t=22s",
    "https://youtu.be/fWNaR-rxAic?t=28s",
    "https://youtu.be/iP6XpLQM2Cs?t=9s",
    "https://youtu.be/9bZkp7q19f0?t=1m10s",
    "https://youtu.be/8UFIYGkROII?t=37s",
    "https://youtu.be/3YxaaGgTQYM?t=1m2s",
    "https://youtu.be/vTIIMJ9tUc8?t=43s",
    "https://youtu.be/qu6r7Yd_iG8?t=1m53s",
    "https://youtu.be/gAs9HZC9c7Y",
    "https://youtu.be/cXeb9cb6k0I",
    "https://youtu.be/U06jlgpMtQs?t=5s",
    "https://youtu.be/wJGcwEv7838?t=12s",
    "https://youtu.be/4LfJnj66HVQ?t=32s",
    "https://youtu.be/3M_5oYU-IsU?t=2m30s",
    "https://youtu.be/rvrZJ5C_Nwg?t=2m22s",
    "https://youtu.be/_gvweJDAIGE?t=15s",
    "https://youtu.be/k55FYtqtXXU?t=3s",
    "https://youtu.be/rQHx_GPKccY?t=40s",
    "https://youtu.be/fq3abPnEEGE",
    "https://youtu.be/yXQViqx6GMY",
    "https://youtu.be/ZJL4UGSbeFg?t=53s",
    "https://youtu.be/xvZqHgFz51I?t=1m36s",
    "https://youtu.be/kJQP7kiw5Fk?t=1m24s",
    "https://youtu.be/oQwNN-0AgWc",
    "https://youtu.be/zVrTEvwjdDY",
    "https://youtu.be/Hy8kmNEo1i8?t=6s",
    "https://youtu.be/gy1B3agGNxw?t=41s",
    "https://youtu.be/E9s1ltPGQOo",
    "https://youtu.be/feA64wXhbjo?t=23s",
    "https://youtu.be/0X-hnHfKzjE",
    "https://youtu.be/d5c4KOopwLs",
    "https://youtu.be/Gs069dndIYk?t=19s",
    "https://youtu.be/3tmd-ClpJxA?t=1m6s",
    "https://youtu.be/mOYZaiDZ7BM",
    "https://youtu.be/llyiQ4I-mcQ?t=12s",
    "https://youtu.be/dP9Wp6QVbsk",
    "https://youtu.be/xAZMu-qKLxE?t=1m19s",
    "https://youtu.be/Sso4vjERgdA"
];

const imageQuotes : String[] = [
    "https://imgur.com/Ht07jm0",
    "https://imgur.com/RYNlB2f",
    "https://i.gyazo.com/7172eb49dcf22f5a1e503d129bb31841.png",
    "https://i.imgur.com/72yJr1m.png",
    "https://i.imgur.com/l5o1sC5.png",
    "https://imgur.com/WNvCDZI",
    "https://imgur.com/WUwuDkA",
    "https://i.imgur.com/futQ7Pq.png",
    "https://i.imgur.com/7TOBbuh.png",
    "https://cdn.discordapp.com/emojis/442718697480519690.gif?v=1",
    "https://gyazo.com/ddd2b61be6bfd21c84f4657a1d2be949.jpg",
    "https://gyazo.com/05e2593e8e68f9f7132977d4f196c2bc.png",
    "https://gyazo.com/a0b1ec50976179a23f0b236e46b0cc6c.png",
    "https://imgur.com/iyECVDr",
    "https://imgur.com/80DFTd2",
    "https://imgur.com/wwCHZPZ",
    "https://imgur.com/WeGJicX"
];

const textQuotes : String[] = [
    "Reasons for me Disliking Soul\n First off this is me, \_RealDeal_ only. No one else is Shadow or anyone else on the server have any affiliation to this document.\n Rereading this document I have realized that I have generalized a lot about Soul not every member does these things so don't think that I think everyone in Soul does this shit.\n"
    ,"Member Stealers\n I see on the forums that some of the officers have a link to the page in their signature, where the people can apply to on the forums, that's cool, except for the fact that it always says applications are closed. This must mean that Soul is not accepting anymore members, right? WRONG they have accepted members from other guilds. An officer stated, \"Well we like to accept people that we know first before we accept random people.\" How do they know that those applicants aren't the most amazing players and they just haven't met them yet. Instead they decide to hurt other guilds and take their members without even contacting the leaders to ask if it's ok.\n Stat Hungry/cheating\n"
    ,"I have observed that Soul cares a lot for stats which is understandable because I do too. I do not approve of certain members who decide to glitch out of maps and farm damage and healing. 2 million damage in one game is outrageous. If one gets 100k damage per game on average, that is 20 games that that person just bypassed. A certain officer said: \"We were just trying to test the limits of warlords, we glitches out of the map so we would not have affected the players actually playing the game.\" Well this does, that many high levels not playing is seriously going to throw off the team balancer.\n"
    ,"Speaking of Team Balancer\n Recently I've been playing a lot more TDM because Soul plays TDM a lot and I like to ruin their games; however, I have noticed that Soul likes to purposefully stack parties on the same team. i.e. I've seen a party of two 90s and an 84 join, and then a party of two low level shamans - you know who you are. I dislike shamans but that is another topic. When you are using an known overpowered class on an already op team verse a bunch of low levels they are going to feel discouraged and their warlords experience will be slightly less enjoyable. Not even I can beat these overpowered parties (I know I'm arrogant but hey I can back it up unlike a lot of Soul members (wait that's my next point forget what I just said)).\n"
    ,"Glitchers\n Speaking of TDM I have seen many members of Soul glitch through the wall on the 2nd level to the 1st level using the horse. Just a small point I wanted to make, but needed to be addressed.\n"
    ,"Target Accusers\n Almost every game I join with a Soul scrub calls me personally out for targeting unless there is an officer there, which is funny. These are the number 2 people I hate the most in all of warlords. The only person I target is my own leader Pandacolorss (nicest person I have ever met). I used to target Kridrom as well because he calls me a randy and untalented paladin(after I flawless him). I do not target him anymore because I'd rather just focus on winning the game and make him feel bad for losing to me instead of being killed by me a couple times. I apologize if it feels that I have targeted someone. It was probably just because they were trying to kill the flag carrier and I wasn't letting them, or we were in a TDM and they had 1000 health and all they were doing was running because that's the only thing they know how to do and I chase them to as Q__T would say \"secure the kill.\"\n"
    ,"Number One Type of Person I Hate\n Leavers. I know sometimes people have to leave for irl reasons but it happens way to often and usually only in games where they are losing. I have seen many Soul members quit games of CTF right after I get one capture. I always stay until the bitter end. I assume they quit the game so the prevent the loss and can get started on the next game that hopefully their sorry selves can win. I have had many epic games where we have been down two caps and still pull off the win. No Soul member will ever get this feeling because they quit right at the first sign of a loss.\n"
    ,"Rumors\n I have heard rumors that rumors have been spreading around inside of the good ole' Soul gchat about me being a toxic player. I am not, I like to talk to the lower levels on my team and give them advice and collaborate with the higher levels to make sure we get the win. I am assuming that some of the Soul members have overheard mine and Uwawa's(one of my many baes) conversations on teamspeak about Soul and have relayed what we have said to their officers. What I say on teamspeak does not reflect how I act in game. I may have a burning hatred for Soul but I put on a nice facade when it comes to in game.\n"
    ,"Cryomancers\n I cannot stand crying band wagoners \"Oh!!!! I just faced Uwawa and found out cryo is op lemme change from pyro to cryo!!!1!11!\" The class is fucking broken (Ice barrier should last for only 6 seconds when it lasts for 10) The sad part is they give me as much trouble as 90 cryos as a random  talented 40 cryo. I Also see those cryos complain about shamans. WTF at least shaman is not broken, it's just overpowered.\n"
    ,"Last Thing\n I see many people in Soul brag about how amazing the guild is in the lobbies. I do not approve of arrogance when you can't back up. This is because I will face said people solo with a few good shamans on my side (can't believe I actually like shamans sometimes) and we dominate those people if you cannot walk your talk then you need a muzzle.\n"
    ,"\_RealDeal_\n"
    ,"Again I am going to reiterate that no one else in shadow or on the server was involved in this document. This was 100% me no one even knows this document exists I just thought Soul needed to know why I strongly dislike them. These are also many possible reasons why other people in the community dislike you guys, and I'm SURE that I have missed a couple more myself, and I'm SURE that I will find other reasons in the future\n"
    ,"P.S. When a good GvG system comes out I challenge Soul to a battle. We may not have all 90s but our guild is built on something that Soul will never have. We look for the mid levels that have great skill and potential that will one day become monsters on the battlefield while Soul Just accepts anyone high level.\n"
    ,"#Paladin4Life\n"
    , "I’d like to say that whenever you address a soul member or call them out for talking bad about other guilds or other people they will just say shut up random or  telling someone that they have no right to talk to them because they are in the elite guild Soul. Their cockiness  gives them the defeat because they just go into games expecting a free and easy win and don’t pay attention to anyone that isn’t lvl 90, yet almost any game I get in that has a soul party like that they get destroyed for the way they act and how they try to start beef in chat. I know I have no right saying that because I start a decent amount of salt in games because when other people are salty I think it’s enjoyable because they act dumb and then let themselves get destroyed, but that’s off topic."
    , "I enjoy a decent amount of people in your guild and the people I enjoy are the only people who aren’t overall assholes.  I also have to include that the members you have are not caring towards anyone else in the community. I can bet that not a single person that is in your guild has gone into a party with someone lvl 70 or below in weeks. And by saying this stuff I have to say my flaws in this fight with Soul. I have participated in many fights and I was responsible for getting Eloquin banned, but Eloquin could have stopped this by not telling me to kill myself. I also start some fights in games or join in the banter but I have been trying to clean up my act. So from this I would appreciate it if you could fix up your guild. Maybe change to kind of act like Shadow, and I’m not saying Shadow is totally perfect because it does have flaws to. But for you guys maybe instead of only recruiting lvl 80+’s go for lvl 60’s and 70’s too. Also please try to enforce on your members to show kindness to other players and not ruin everyone else’s playing experience just so they can have better stats.\n"
    , "Thank you for taking the time to read this. <3\n"

    , "\_RealDeal_ & Shadow\n Let me first address how many problems RealDeal has caused, whether it is within Shadow, between people, or within the guild. Sure, you can say this document is suppose to “expose” RealDeal and what type of horrible guild Shadow has been running under lately.\n"
    , "A few officers of Shadow left, you may know them and you may not. But I’m not planning to pull anybody into this document unless their name is RealDeal. I’m not going to say their names, but yeah a few officers of Shadow left. The reason they left was mainly because of RealDeal, causing a separation within their beliefs and because of that they left. One said that their words didn’t matter in the guild and that they didn’t feel like they mattered as an officer. Ever since their departing in Shadow, RealDeal has been fabricating and creating lies to get them back in his hands.\n"
    , "RealDeal believes that Steal My Acorns, a very respectful guild in my eyes, is a toxic guild and he is willing to take them all on. Steal My Acorns could be toxic at times, but RealDeal has always been talking shit and smack about Acorns knowing that he wouldn’t be able to even do anything about it. He’s always talking shit about specific people in Acorns, acting like he is more superior then they are. Let me tell you one thing, you aren’t buddy. His ex-officers saw this as a separation between each other because his ex-officers thought that Acorns was a very respectable guild and RealDeal should get to know them better, he denied the officer and continued his path of hating on the guild as well as the people in it. Just because Steal My Acorns is more superior than you, doesn’t mean you have to be toxic about them Real :).\n"
    , "When RealDeal lost his relationship with one of his officers, he decided to have another relationship with someone else and RealDeal lost it again not too long. She ended their relationship because RealDeal was playing Warlords way too much and she felt like he didn’t care about their relationship, nor her. Because of this depressing story, she was enraged with anger and she went crazy. Wanting to kill RealDeal in real life, physically hurting him. Congratulations RealDeal, how about you worry about your relationship and not a damn block game!\n"
    , "I didn’t sit here and make this document for kicks and giggles, I mean everything I say. RealDeal is a fraud, and he fabricate lies to make himself look good and others look bad. RealDeal you are fake as fuck, you aren’t real a single bit. You are manipulative and the whole time when you said that Steal My Acorns was a bad guild, and everybody in it was toxic and horrible you were wrong because they really weren’t. I’m not writing this because I’m the bad guy, I’m writing this because RealDeal, you need to realize that your life isn’t sooo dependent on a damn block game, it’s not sooo dependent on fucking stats. The only reason you are falling apart and you are lying is because your life is more dependent on a block game then your own self.\n"
    , "Everybody in Shadow, I’m sorry that you didn’t know about this earlier. But your guild leader is a fraud, he is fake and he will do anything to sway your heads into thinking Steal My Acorns, or any specific guild or specific person is evil and bad. But let me tell you now, barely anything he says is true and it’s all made up. He thinks he can control you, and don’t let him think that! He turned so many people in Shadow stat whores, because you let him control you. Shadow is ran on stats. Don’t let it be that way, let it be ran on friendship and happiness. Don’t let him control you.\n"
    , "RealDeal, congratulations. You’ve officially made a whole guild hate you, your ex wanting to murder you in real life, and others trying to destroy your life.\n"
    , "You’ve already shattered, you’ve made your guild fall.\n"
    , "It’s your move.\n"

    ,"I cried, yes I am a pussy, yes I cried over a block game"
    ,"Felflame’s Document - Hi Wally, glad you moved on to Felflame, he is much easier to manipulate."
    ,"Kara’s first document - I really do appreciate everything that you wrote in this, thank you for clearing things up"
    ,"Kara’s Second document So the two of us were a little close.  You could call us friends, best friends, or just close friends.  I was trying to help him fix things with people by giving him advice and talking to him, and he’d help me out with my depression.  Anyone who knows me even a little bit knows how hard I am to talk to when I get depressed.  Kudos to everyone who tried.\n" + "I considered you to be my best friend, everytime I tried to help you, it was because I truly cared about you. \n"
    ,"When that happened, Real was hit pretty hard.  It was difficult getting him to not think about it.  But any time he wasn’t doing something, he would think about it.  As would I.  Gradually, over the course of a few days, he started to calm down.  However, over that time, that’s when the situation started to hit me.  I started to bear an irrational animosity towards the former officers and everyone who left the guild for them.  To Real, I would insult them out of anger, and he’d agree and do the same.  Over time, I started snapping at people because I was getting more and more angry.  Eventually, I made the decision to cut all ties with the community, with everyone, including Real who I’d become so close to.  Shortly before I’d done so, Real had broken up from his previous relationship.\n"
    ,"Also that speech that I gave last Friday: I killed it! Had everyone laughing, and it was a really good time, public speaking is a lot of fun, once you get passed the whole fear of messing up in front of 250 people."
    ,"I grind a lot, but I wouldn't say no-life. I have actually accomplished quite a bit in real life, it is called proper time management. I prioritize the important stuff like school and work, and then make sure to leave time for my irl friends, and leave time for my online friends. I simply chose Warlords as a means to spend time with my online friends because they also like Warlords, and it is something mutual that we can bond over.\n"
    ,"LMAO how do you know anything about my personal life. Also lots of woman like Anime, it isn't just a guy thing. A lot of the well-known fan service Animes like Highschool DxD make the audience that has not taken the time to appreciate anime believe that it is all like that. There are all sorts of genres that you can get into, and for some reason the Japanese are insanely good at creating amazing plot and character development. If you would like an anime recommendation Harley, I would say you should watch Assassination Classroom, it is right up your alley: simple plot, cool fights, and really funny."
    ,"A smaller, side thing is I like seeing myself get better. Every game I join I tell myself 1 thing that I am going to improve on, then I focus on trying to improve that. Whether it be my seismic wave accuracy, timing of ground slam, map awareness, cycling damage powerups, using my horse efficiently, cycling dom points, whatever it is. If I get a little better than I am proud of myself. Many people do not like to play this way and do not find it fun to actively improve themselves which is fine, so they play paladin instead (no it isn't I hate those people, screw you guys for not caring about the game, getting put on my team and forcing me to carry you. screw you) but I am very casual, winning is fun I guess, therefore I always try to win (including playing cryo and defender of course) I find it enjoyable when I challenge myself to be the best that I can be, now only if I could do that personality wise, then maybe I would be such a terrible person hahahahaha I hate myself"
    ,"A smaller, side thing is I like seeing myself get better. Every game I join I tell myself 1 thing that I am going to improve on, then I focus on trying to improve that. Whether it be my consecrate placement, timing of holy radiances, map awareness, cycling damage powerups, using my horse efficiently, cycling dom points, whatever it is. If I get a little better than I am proud of myself. Many people do not like to play this way and do not find it fun to actively improve themselves which is fine (no it isn't I hate those people, screw you guys for not caring about the game, getting put on my team and forcing me to carry you. screw you) but I am very competitive, winning is fun, therefore I do everything I can to win (besides playing cryo and defender of course) I find it enjoyable when I challenge myself to be the best that I can be, now only if I could do that personality wise, then maybe I wouldn't be such a terrible person hahahahaha I hate myself"
    ,"Realdeal x Crafty - Based on a true story \n Just saying ever since I got back from the good ole' ban she has been the one coming to me. She has been pestering me about everything and I told it plain and simple to her in a private chat why I don't like her. Isn't being honest the right thing to do? Knowing that I would only just make the situation worse from then on, I removed her, and put her on my /ignore. This whole thread was made because she was upset that I wouldn't talk to her yesterday. Even though if I did it would only make everything a hell of a lot worse. Long story short, she is the one that keeps coming to me, she is the one that keeps asking why I don't like her, and I am being honest with her (which apparently is a bad thing), and then I am being the proactive one knowing that communicating with her will never solve anything.\n"
    ,"A 4 person Dom party can be very taxing on the team, and is very hard for those 4 players to carry."
];

const totalQuotes = (() => {
    const arr : String[] = [];
    for(const v of imageQuotes) {
        arr.push(v)
    }
    for(const v of textQuotes) {
        arr.push(v)
    }
    return arr;
})();

if(!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY)
    throw "Provide AWS credentials!";

AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID.toString();
AWS.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY.toString();

// Create an Polly client
const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'eu-west-1'
});

const discord = new Client();

async function start() {
    await discord.login(process.env.DISCORD_TOKEN);
    console.log("Discord Connected!");

    setInterval(() => {
        discord.user.setPresence(status[Math.floor(Math.random()*status.length)]).catch(console.error);
    }, 1000 * 10);
}

interface Settings {
    nofunEnabled : boolean
}

const voiceMap : { [guild : string]: VoiceConnection} = {};
const settingsMap : { [guild : string]: Settings} = {};


async function pollyTTS(msg : Message, speaker? : VoiceId, text? : string){
    if(!text) text = textQuotes[Math.floor(Math.random()*textQuotes.length)].toString();
    Polly.synthesizeSpeech({
        Text : text,
        VoiceId: speaker ? speaker : "Joey",
        OutputFormat : "mp3",
    }, ((err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        if (data.AudioStream instanceof Buffer) {
            const stream = new Stream.PassThrough();
            stream.end(data.AudioStream);
            playStream(msg, stream).catch(console.error)
        }
    }));
}

async function playYoutube(msg : Message, url : string, volume? : number){
    if(!url.match(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/)){
        await msg.reply("This is not a youtube link - worthless cunt!");
        return;
    } else {
        await playStream(msg, ytdl(url, { filter: 'audioonly' }), volume)
    }

}

async function playStream(msg : Message, stream : Readable, volume? : number | 1){
    await joinVoice(msg);
    const dispatcher = voiceMap[msg.guild.id].playStream(stream, {volume : volume});
    dispatcher.once("end", reason => {
        if(reason === undefined) return;
        voiceMap[msg.guild.id].disconnect();
        delete voiceMap[msg.guild.id];
    });
}

const help = "It’s your move.\n\n!nofun help - help\n" +
    "!nofun RealDeal.mp4\n" +
    "!nofun exposed\n" +
    "!nofun DTRASh\n" +
    "!nofun earrape\n" +
    "!nofun windowsxp\n" +
    "!nofun wii\n" +
    "!nofun ytmeme\n" +
    "\n!nofun play { url }\n" +
    "!nofun say { text }\n" +
    "!nofun invitelink\n" +
    "\n!nofun toggle\n" +
    "\n!nofun stop\n" +
    "!nofun pause\n" +
    "!nofun resume\n" +
    "\nPlz don not say NO FUN or I get triggered and I ban you from this Discord server - FOREVER :rage: \n";

async function commands(msg : Message){
    const args = msg.content.split(" ");
    console.log(new Date().toISOString() + " | "+ msg.guild.name +"#" +msg.guild.id + " | " + msg.author.tag + " | " + msg.content);
    if(args.length === 1 || args[1] === "help"){
        await msg.reply(help);
        return;
    } else if (args[1] === "stop"){
        if(voiceMap[msg.guild.id]){
            voiceMap[msg.guild.id].disconnect();
            delete voiceMap[msg.guild.id];
            await msg.reply("Okay - Worthless piece of shit I stop NOFUN! Pathetic cunt!")
        }
    } else if (args[1].toLowerCase() === "_realdeal_.mp4" || args[1].toLowerCase() === "realdeal.mp4" ){
        await playYoutube(msg, "https://youtu.be/MH_t2NIklMg")

    } else if (args[1].toLowerCase() === "exposed"){
        await playYoutube(msg, "https://youtu.be/JysJqkueMoI")

    } else if (args[1].toLowerCase() === "dtrash"){
        await playYoutube(msg, "https://youtu.be/McLbBiK-poE")

    } else if (args[1].toLowerCase() === "wii"){
        await playYoutube(msg, "https://youtu.be/LYN6DRDQcjI", 0.5)

    } else if (args[1].toLowerCase() === "windowsxp"){
        await playYoutube(msg, "https://youtu.be/6Joyj0dmkug", 10)

    } else if (args[1].toLowerCase() === "ytmeme"){
        await playYoutube(msg, memes[Math.floor(Math.random()*memes.length)].toString(), 1)

    } else if (args[1].toLowerCase() === "play") {
        await playYoutube(msg, args[2])

    } else if (args[1].toLowerCase() === "pause"){
        if(voiceMap[msg.guild.id] && voiceMap[msg.guild.id].dispatcher) voiceMap[msg.guild.id].dispatcher.pause()

    } else if (args[1].toLowerCase() === "resume"){
        if(voiceMap[msg.guild.id] && voiceMap[msg.guild.id].dispatcher) voiceMap[msg.guild.id].dispatcher.resume()

    } else if(args[1].toLowerCase() === "say"){
        if(msg.content.length <= msg.content.indexOf("say") + 4 + 20)
            await msg.reply("I don't care if you do this bullshit to me. But your message is to short!");
         else
            await pollyTTS(msg, "Joey", msg.content.substring(msg.content.indexOf("say") + 4))

    } else if(args[1].toLowerCase() === "invitelink"){
        await msg.reply("Add me PLZZZZZZ \nhttps://discordapp.com/oauth2/authorize?client_id=481915476256096267&scope=bot&permissions=8" )

    } else if(args[1].toLowerCase() === "toggle"){
        if(!msg.member.hasPermission("ADMINISTRATOR"))
            await msg.reply("I just find it pathetic with the way you act. Stop acting like a 7 year old. Show a little bot of respect for yourself. Scum");
        else
            getStetingsMap(msg.guild.id).nofunEnabled = !getStetingsMap(msg.guild.id).nofunEnabled;
    } else {
        await msg.reply(help)
    }
}

function getStetingsMap(guildID : Snowflake){
    if(settingsMap[guildID]) return settingsMap[guildID];

    settingsMap[guildID] = {
        nofunEnabled : true
    };

    return settingsMap[guildID];
}

async function joinVoice(msg : Message){
    if (msg.member.voiceChannel)
        voiceMap[msg.guild.id] = await msg.member.voiceChannel.join();
    else await msg.reply("Wtf do you want you pathetic cunt. Join a voice channel to use the !nofun command. Otherwise stfu wortless treash.")
}

async function noFun(msg : Message){
    if(!getStetingsMap(msg.guild.id).nofunEnabled) return;
    if(msg.author.id === discord.user.id) return;
    console.log(new Date().toISOString() + " | " + msg.guild.name +"#" +msg.guild.id + " | " + msg.author.tag + " triggered RealDeal");

    if(!msg.guild.emojis.find((value) => value.name.toLowerCase() === "nofun")){
        await msg.guild.createEmoji(fs.readFileSync("emote.png"), "nofun") ;
    }

    await msg.react(msg.guild.emojis.find((value) => value.name.toLowerCase() === "nofun"));

    if (msg.member.voiceChannel) await pollyTTS(msg);
    else await msg.reply(totalQuotes[Math.floor(Math.random()*totalQuotes.length)]);
}

discord.on("message", async msg =>{
    try{
        if(msg.content.toUpperCase().match(/^!NOFUN/))
            await commands(msg);
         else if (msg.content.toUpperCase().match(/NO *FUN/))
            await noFun(msg);
    } catch (e){
        console.error(e)
    }
});


start().catch(console.error);