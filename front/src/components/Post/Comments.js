import axios from 'axios';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { useSelector } from 'react-redux';

const Comments = ({ comments = [], id = '' }) => {
    const [comm, setComm] = useState(comments);
    const { user: currentUser } = useSelector((state) => state.auth);
    const commentsMemo = useMemo(() => {
        return comm.map((comment, index) => (
            <Comment comment={comment} key={index} />
        ));
    }, [comm]);
    useLayoutEffect(() => {
        console.log(comments);
        if (comm.length == 0) {
            setComm(comments);
        }
    }, [comments]);
    const addComment = async (values, reset) => {
        console.log(123);
        axios
            .post('http://localhost:3000/api/comments/new', {
                user: currentUser.user._id,
                body: values.body,
                post: id,
            })
            .then((response) => {
                setComm((prev) => [response.data.Comment, ...prev]);
                reset();
                console.log(comm);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="not-format">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
                    Discussion ({comm.length})
                </h2>
            </div>
            <CommentForm addComment={addComment} />
            {commentsMemo}
        </div>
    );
};

export default Comments;
