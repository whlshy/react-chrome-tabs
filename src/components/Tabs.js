import React, { useState, useRef, useEffect } from 'react';
import styles from '../style/Tabs.styl'
import CSSModules from 'react-css-modules';
import propTypes from 'prop-types';

function Tabs(props) {
	const { currentTabs, onChange, defaultCurrent, onClose, className, style, dark, onClick } = props;
	const [active, setActive] = useState(0);
	const [tabContentWidths, setTabContentWidths] = useState([]);
	const [positions, setPositions] = useState(0);
	const [tabs, setTabs] = useState(currentTabs || []);
	const [sorting, setSorting] = useState(false);
	const [isDragging, setDragging] = useState(false);
	const tabContentEl = useRef(null);

	const TAB_CONTENT_MARGIN = 9
	const TAB_CONTENT_OVERLAP_DISTANCE = 1

	const TAB_OVERLAP_DISTANCE = (TAB_CONTENT_MARGIN * 2) + TAB_CONTENT_OVERLAP_DISTANCE

	const TAB_CONTENT_MIN_WIDTH = 24
	const TAB_CONTENT_MAX_WIDTH = 240

	useEffect(() => {
		setTabContentWidths(getContentWidths());
		setPositions(tabContentPositions(getContentWidths()));
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		}
	}, []);

	useEffect(() => {
		!!onChange && onChange(tabs);
		handleResize();
	}, [tabs]);

	useEffect(() => {
		!!currentTabs && setTabs(currentTabs);
	}, [currentTabs]);

	useEffect(() => {
		active != defaultCurrent && setActive(defaultCurrent);
	}, [defaultCurrent]);

	const handleResize = () => {
		setTabContentWidths(getContentWidths());
		setPositions(tabContentPositions(getContentWidths()));
	}

	const getContentWidths = () => {
		if (tabContentEl.current) {
			const numberOfTabs = tabs.length
			const tabsContentWidth = tabContentEl.current.clientWidth
			const tabsCumulativeOverlappedWidth = (numberOfTabs - 1) * TAB_CONTENT_OVERLAP_DISTANCE
			const targetWidth = (tabsContentWidth - (2 * TAB_CONTENT_MARGIN) + tabsCumulativeOverlappedWidth) / numberOfTabs
			const clampedTargetWidth = Math.max(TAB_CONTENT_MIN_WIDTH, Math.min(TAB_CONTENT_MAX_WIDTH, targetWidth))
			const flooredClampedTargetWidth = Math.floor(clampedTargetWidth)
			const totalTabsWidthUsingTarget = (flooredClampedTargetWidth * numberOfTabs) + (2 * TAB_CONTENT_MARGIN) - tabsCumulativeOverlappedWidth
			const totalExtraWidthDueToFlooring = tabsContentWidth - totalTabsWidthUsingTarget

			// TODO - Support tabs with different widths / e.g. "pinned" tabs
			const widths = []
			let extraWidthRemaining = totalExtraWidthDueToFlooring
			for (let i = 0; i < numberOfTabs; i += 1) {
				const extraWidth = flooredClampedTargetWidth < TAB_CONTENT_MAX_WIDTH && extraWidthRemaining > 0 ? 1 : 0
				widths.push(flooredClampedTargetWidth + extraWidth)
				if (extraWidthRemaining > 0) extraWidthRemaining -= 1
			}
			return widths
		}
	}

	const tabContentPositions = (ContentWidths) => {
		const positions = []
		const widths = ContentWidths || tabContentWidths;

		let position = TAB_CONTENT_MARGIN
		widths.forEach((width, i) => {
			const offset = i * TAB_CONTENT_OVERLAP_DISTANCE
			positions.push(position - offset)
			position += width
		})

		return positions
	}

	const animateTabMove = (position, index) => {
		setSorting(true)
		let closest = Infinity
		let closestIndex = -1
		let tabsDrag = []
		positions.forEach((v, i) => {
			if (Math.abs(position - v) < closest) {
				closest = Math.abs(position - v)
				closestIndex = i
			}
		})
		closestIndex = Math.max(0, Math.min(positions.length, closestIndex));
		if (index != closestIndex) {
			positions.forEach((v, i) => {
				if (i == index) {
					tabsDrag[i] = tabs[closestIndex > index ? i + 1 : i - 1]
				}
				else if (index > i && i >= closestIndex) { // 往前
					tabsDrag[i] = tabs[i + 1]
				}
				else if (index < i && i <= closestIndex) {
					tabsDrag[i] = tabs[i - 1]
				}
				else {
					tabsDrag[i] = tabs[i]
				}
			})
			
			checkIndex(tabsDrag) && onChange(tabsDrag)
		}
		setSorting(false)
	}

	const checkIndex = (newTabs) => {
		return new Set(newTabs).size === newTabs.length;
	}

	const closeTab = (idx) => {
		!!onClose ? onClose(idx) : onChange(tabs.filter((m, index) => index != idx))
	}
	return (
		<div className={className} style={style}>
			<div
				className={`whl_tabs${!!dark ? " whl_tabs-dark-theme" : ""}${!isDragging ? " whl_tabs-is-sorting" : ""}`}
				style={{ "--tab-content-margin": "9px" }}
			>
				<div className={`whl_tabs_content`} ref={tabContentEl} >
					{
						!!tabs && tabs.map((m, index) =>
							!!positions[index] &&
							<Tab
								key={m.key}
								favicon={m.favicon}
								title={m.title}
								active={active === m.key}
								position={positions[index]}
								contentWidth={tabContentWidths[index]}
								onClick={e => (setActive(m.key), onClick(m.key))}
								onClose={e => closeTab(m.key)}
								setDragging={setDragging}
								tabsContentWidth={tabContentEl.current && tabContentEl.current.clientWidth}
								animateTabMove={p => animateTabMove(p, index)}
								isDragging={isDragging}
								id={m.key}
								index={index}
								sorting={sorting}
							/>)
					}
				</div>
				<div className="whl_tabs-bottom-bar"></div>
			</div>
			<div className="whl_tabs-optional-shadow-below-bottom-bar"></div>
		</div>

	);
}

Tabs.propTypes = {
	/** 分頁陣列 e.g. ```[{"favicion": "url", "title": "title"}]```*/
	defaultTabs: propTypes.array,
	/** 預設分頁位置，index*/
	defaultCurrent: propTypes.number,
	onChange: propTypes.func,
	onClose: propTypes.func,
	className: propTypes.string,
	style: propTypes.object,
	dark: propTypes.bool,
	onClick: propTypes.func,
}

Tabs.defaultProps = {
	defaultTabs: [],
	defaultCurrent: 0,
	dark: false,
	className: "",
	style: {},
	onClick: () => { },
}

export default CSSModules(Tabs, styles);


const Tab = (props) => {
	const { favicon, title, active, position, contentWidth, onClick, onClose, setDragging, tabsContentWidth, animateTabMove,
		isDragging, id, index, sorting } = props;
	const [width, setWidth] = useState(0);
	const [isAdded, setAdd] = useState(false);
	const [movePosition, setMovePosition] = useState(null);
	const [startX, setStartX] = useState(null);
	const [dragEnd, setDragEnd] = useState(false);
	const [tmpPosition, setTmpPosition] = useState(false);
	const tabEl = useRef(null);

	const TAB_CONTENT_MARGIN = 9
	const TAB_CONTENT_OVERLAP_DISTANCE = 18

	const TAB_OVERLAP_DISTANCE = (TAB_CONTENT_MARGIN * 2) + TAB_CONTENT_OVERLAP_DISTANCE

	const TAB_SIZE_SMALL = 84
	const TAB_SIZE_SMALLER = 60
	const TAB_SIZE_MINI = 48

	useEffect(() => {
		document.addEventListener('mousemove', onDragMove);
		document.addEventListener('mouseup', onDragEnd);
		return () => {
			document.removeEventListener('mousemove', onDragMove);
			document.addEventListener('mouseup', onDragEnd);
		}
	});

	useEffect(() => { // 新 tab 動畫
		if (!isAdded) {
			setTimeout(() => setAdd(true), 500)
		}
	}, [isAdded])

	useEffect(() => {
		setWidth(contentWidth + (2 * TAB_CONTENT_MARGIN))
	}, [contentWidth])

	const onDragStart = (e) => {
		if (e.button === 0) {
			setDragging(true)
			setStartX(e.pageX)
			setDragEnd(false)
			setTmpPosition(position)
		}
	}

	const onDragMove = (e) => {
		if (startX != null && isDragging) {
			let newPosition = tmpPosition - TAB_CONTENT_MARGIN + (e.pageX - startX);

			newPosition < 0 && (newPosition = 0)
			newPosition > tabsContentWidth - width && (newPosition = tabsContentWidth - width)
			setMovePosition(newPosition)
			!sorting && animateTabMove(newPosition,)
		}
	}

	const onDragEnd = (e) => {
		if (startX != null && isDragging) {
			setStartX(null)
			setMovePosition(null)
			setDragging(false)
			setDragEnd(true)
		}
	}
	const [tmp, setTmp] = useState(position - TAB_CONTENT_MARGIN);
	useEffect(() => { // 新 tab 動畫

		setTmp(!!position ? position - TAB_CONTENT_MARGIN : 0)

	}, [index, position])

	return (
		<div
			className={`whl_tab ${!isAdded ? " whl_tab-was-just-added" : ""}${startX == null && !active ? " whl_tab-was-just-dragged" : ""}`}
			style={{
				transform: `translate3d(${movePosition == null ? tmp : movePosition}px, 0, 0)`, width: `${width}px`
			}}
			active={active !== false ? "" : null} is-small={contentWidth < TAB_SIZE_SMALL ? "" : null}
			is-smaller={contentWidth < TAB_SIZE_SMALLER ? "" : null} is-mini={contentWidth < TAB_SIZE_MINI ? "" : null}
			// draggable={true}
			// onMouseMove={onDragMove}
			// onMouseUp={onDragEnd}
			ref={tabEl}
		>
			<div className="whl_tab-dividers"></div>
			<div className="whl_tab-background">
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<symbol id="whl_tab-geometry-left" viewBox="0 0 214 36"><path d="M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z" /></symbol>
						<symbol id="whl_tab-geometry-right" viewBox="0 0 214 36"><use xlinkHref="#whl_tab-geometry-left" /></symbol>
						<clipPath id="crop"><rect className="mask" width="100%" height="100%" x="0" /></clipPath>
					</defs>
					<svg width="52%" height="100%"><use xlinkHref="#whl_tab-geometry-left" width="214" height="36" className="whl_tab-geometry" />
					</svg>
					<g transform="scale(-1, 1)">
						<svg width="52%" height="100%" x="-100%" y="0"><use xlinkHref="#whl_tab-geometry-right" width="214" height="36" className="whl_tab-geometry" />
						</svg>
					</g>
				</svg>
			</div>
			<div className="whl_tab-content">
				{!!favicon && <div className="whl_tab-favicon" style={{ "backgroundImage": `url(${favicon})` }}></div>}
				<div className="whl_tab-title">{title}</div>
				<div className="whl_tab-drag-handle" title={title} onClick={onClick} onPointerDown={e => (onClick(e))} onMouseDown={onDragStart}></div>
				<div className="whl_tab-close" onClick={onClose}></div>
			</div>
		</div>
	);
}