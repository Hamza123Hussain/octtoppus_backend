import { Router } from 'express'
import { MakeAuction } from '../Controllers/Auction/CreateAuction.js'
import { getAllAuctions } from '../Controllers/Auction/GetAllAuctions.js'
import { getSingleAuction } from '../Controllers/Auction/GetSingleAuction.js'
import { PlaceBid } from '../Controllers/Auction/NewBid.js'
const AuctionRouter = Router()
AuctionRouter.post('/MakeAuction', MakeAuction)
// AuctionRouter.get('/AllAuctions', getAllAuctions)
// AuctionRouter.get('/SingleAuction', getSingleAuction)
/**give AuctionID as query */
AuctionRouter.post('/SingleBid', PlaceBid)
export default AuctionRouter
