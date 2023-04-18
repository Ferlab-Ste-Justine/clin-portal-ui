import ReactDOMServer from 'react-dom/server';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Consequence, Impact } from 'graphql/variants/models';

import HighBadgeIcon from 'components/icons/variantBadgeIcons/HighBadgeIcon';
import LowBadgeIcon from 'components/icons/variantBadgeIcons/LowBadgeIcon';
import ModerateBadgeIcon from 'components/icons/variantBadgeIcons/ModerateBadgeIcon';
import ModifierBadgeIcon from 'components/icons/variantBadgeIcons/ModifierBadgeIcon';
import { toKebabCase } from 'utils/helper';

import { generateConsequencesDataLines } from './consequences';

import style from './index.module.scss';

type OwnProps = {
  consequences: Consequence[];
};

const impactToColorClassName = Object.freeze({
  [Impact.High]: <HighBadgeIcon svgClass={`${style.bullet} ${style.highImpact}`} />,
  [Impact.Low]: <LowBadgeIcon svgClass={`${style.bullet} ${style.lowImpact}`} />,
  [Impact.Moderate]: <ModerateBadgeIcon svgClass={`${style.bullet} ${style.moderateImpact}`} />,
  [Impact.Modifier]: <ModifierBadgeIcon svgClass={`${style.bullet} ${style.modifierImpact}`} />,
});

const pickImpacBadge = (impact: Impact) => impactToColorClassName[impact];

const removeVariantString = (value: string) => value.toLowerCase().replaceAll('variant', '');

const ConsequencesCell = ({ consequences }: OwnProps) => {
  const lines = generateConsequencesDataLines(consequences);
  return (
    <>
      {lines.map((consequence: Consequence, index: number) => {
        /* Note: index can be used as key since the list is readonly */
        const node = consequence.node;

        if (node.consequences) {
          return (
            <StackLayout center key={index}>
              {pickImpacBadge(node.vep_impact)}
              <span key={index} className={style.detail}>
                {removeUnderscoreAndCapitalize(removeVariantString(node.consequences[0]))}
              </span>
              {node.symbol && (
                <span key={toKebabCase(node.symbol)} className={style.symbol}>
                  {' '}
                  <ExternalLink
                    href={`https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${node.symbol}`}
                  >
                    {node.symbol}
                  </ExternalLink>
                </span>
              )}{' '}
              {node.aa_change && <span>{node.aa_change}</span>}{' '}
            </StackLayout>
          );
        }

        return null;
      })}
    </>
  );
};

export const renderToString = (row: any) =>
  ReactDOMServer.renderToString(
    <ConsequencesCell consequences={row.consequences?.hits?.edges || []} />,
  );

export default ConsequencesCell;
