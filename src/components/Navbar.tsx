import React from 'react';
import { Logo } from '../utils/svg';
import { navbar } from '../utils/navbar';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
	const location = useLocation();

	return (
		<nav className="absolute z-50 w-24 flex flex-col items-center gap-12 px-4 py-8">
			<Logo />

			<div className="flex flex-col gap-3 flex-grow">
				{navbar.top.map((item, i) => (
					<Link to={item.link} key={i} className={`icon ${location.pathname == item.link ? 'active' : ''}`}>
						<item.icon />
					</Link>
				))}
			</div>

			<div className="flex flex-col gap-3">
				{navbar.bottom.map((item, i) => (
					<a key={i} className={`icon`}>
						<item.icon />
					</a>
				))}
			</div>
		</nav>
	);
};

export default Navbar;
