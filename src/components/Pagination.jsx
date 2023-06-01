import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Pagination({ itemCount, limit }) {
	const [searchParams, setSearchParams] = useSearchParams()
	const pages = Array.from(
		{ length: Math.ceil(itemCount / limit) },
		(_, i) => i + 1
	)
	let pageValue = +searchParams.get('p') || 1
	useEffect(() => {}, [searchParams, limit])

	return pages.length === 1 ? (
		<>
			There are: {itemCount} elements, the limit is: {limit}
		</>
	) : (
		<section>
			<p>
				There are: {itemCount} elements, the limit is: {limit}, and there are{' '}
				{pages.length} pages;
			</p>
			{pages.map((page) => {
				return (
					<button
						key={page}
						disabled={page === pageValue}
						value={page}
						onClick={(e) => {
							const newParams = {
								sort_by: searchParams.get('sort_by'),
								order: searchParams.get('order'),
								limit: searchParams.get('limit'),
								p: searchParams.get('p'),
							}
							if (!newParams.sort_by) delete newParams.sort_by
							if (!newParams.order) delete newParams.order
							if (!newParams.limit) delete newParams.limit
							newParams.p = e.target.value
							setSearchParams(newParams)
						}}
					>
						{page}
					</button>
				)
			})}
		</section>
	)
}
