import { useRef } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../Config/firebase/DB";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function DeleteProduct({ product }) {
    const modalRef = useRef();
    const navigate = useNavigate();
    
    const modalId = `deleteModal-${product.Product_ID}`;

    const  handleDelete = async () =>{
        await deleteDoc(doc(db, "Post", product.Product_ID));
        if (modalRef.current) {
            modalRef.current.click();  // Close the modal
        } 
        toast.success('Product Deleted!')
        
    }



    return (
        <>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
                Delete
            </button>

            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`${modalId}Label`}>Delete Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={modalRef}></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this product?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
