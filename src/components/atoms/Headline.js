import React from 'react'
import classNames from 'classnames';

function Headline({text, level = 4, align}) {
    const aligne = align ? align : 'left';
    const Tag =`h${level}`;
  return (
    <div>
        <Tag
        className={classNames(
            {
                'text-left': aligne === 'left',
                'text-center': aligne === 'center',
                'text-right': aligne === 'right',
                'ml-auto': aligne === 'center',
            },
            'mb-4'
        )}
        dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  )
}

export default Headline