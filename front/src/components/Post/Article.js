import React from 'react';
import DOMPurify from 'dompurify';

const Article = ({ body = '' }) => {
    const sanitizedData = () => ({
        __html: DOMPurify.sanitize(body),
    });
    return (
        <div className="prose" dangerouslySetInnerHTML={sanitizedData()}></div>
    );
};

export default Article;
