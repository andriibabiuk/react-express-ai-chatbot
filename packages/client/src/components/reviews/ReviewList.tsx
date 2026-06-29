import axios from 'axios';
import { useEffect, useState } from 'react';
import StarRating from './StarRating';

type Props = {
   productId: number;
};
type Review = {
   id: number;
   author: string;
   content: string;
   rating: number;
   createdAt: string;
};
type GetReviewsResponse = {
   summary: string | null;
   reviews: Review[];
};
const ReviewList = ({ productId }: Props) => {
   const [reviewData, setReviewData] = useState<GetReviewsResponse>();
   const fetchReviews = async () => {
      axios
         .get<GetReviewsResponse>(`/api/products/${productId}/reviews`)
         .then((res) => {
            setReviewData(res.data);
         })
         .catch((err) => {
            console.error(err);
         });
   };

   useEffect(() => {
      fetchReviews();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
      <div className="flex flex-col gap-5">
         {reviewData?.reviews.map((review) => (
            <div key={review.id}>
               <div className="font-semibold">{review.author}</div>
               <div>
                  <StarRating value={review.rating} />
               </div>
               <p className="py-2">{review.content}</p>
            </div>
         ))}
      </div>
   );
};

export default ReviewList;
