import { AuctionModel } from '../../Model/Auction.js'
export const PlaceBid = async (req, res) => {
  const { AuctionID, Bid, UserID } = req.body
  // Check if AuctionID and Bid are provided
  if (!AuctionID || !Bid || !UserID) {
    return res
      .status(400)
      .json({ message: 'Auction ID, Bid, and User ID are required' })
  }
  try {
    // Fetch the auction by ID
    const auction = await AuctionModel.findById(AuctionID)
    // Check if auction exists
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' })
    }
    // Optionally, you might want to validate that the bid is higher than the current bid
    if (Bid <= auction.currentBid) {
      return res
        .status(400)
        .json({ message: 'Bid must be higher than the current bid' })
    }
    // Update the auction with the new bid
    auction.currentBid = Bid
    auction.highestBidder = UserID
    await auction.save()
    res.status(200).json({ success: true, message: 'Bid placed successfully' })
  } catch (error) {
    // Handle unexpected errors
    console.error('Error placing bid:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
