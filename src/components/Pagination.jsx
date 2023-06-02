import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Pagination({ itemCount, limit }) {
	const [searchParams, setSearchParams] = useSearchParams()
	const [page, setPage] = useState(1)
	const pages = Array.from(
		{ length: Math.ceil(itemCount / limit) },
		(_, i) => i + 1
	)
	let pageValue = +searchParams.get('p') || 1
	useEffect(() => {}, [searchParams, limit])

	return pages.length === 1 ? (
		<p>
			There are: {itemCount} elements. Showing {limit} elements per page.
		</p>
	) : (
		<section>
			<p>
				There are: {itemCount} elements. Showing {limit} elements per page. You
				are in {page}/{pages.length}
			</p>
			{pages.map((page) => {
				return (
					<button
						key={page}
						disabled={page === pageValue}
						value={page}
						onClick={(e) => {
							setPage(page)
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
