import { AuctionModel } from '../../Model/Auction.js'
export const getSingleAuction = async (AuctionID) => {
  try {
    // Find all auctions and populate the product and highestBidder fields
    const auction = await AuctionModel.findById(AuctionID)
      .populate('product') // Populate the product field with product details
      .populate('highestBidder') // Populate the highestBidder field with user details

    return auction
  } catch (error) {
    console.error('Failed to retrieve auctions:', error)
    throw new Error('Failed to retrieve auctions') // Throw an error for socket handling
  }
}
